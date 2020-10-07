import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {ProductActions} from '../../../state-management/product/product.actions';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import FetchShopProducts = ProductActions.FetchShopProducts;
import {MatPaginator} from '@angular/material/paginator';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';
import FetchCustomProducts = ProductActions.FetchCustomProducts;
import {ProductsCustomFilterDto} from '../../../commons/public-dto/products-custom-filter.dto';

export enum LoadType {
  TAG = 'TAG',
  SHOP_PRODUCTS = 'SHOP_PRODUCTS',
  SUB_CATEGORY = 'SUBCATEGORY',
  CUSTOM = 'CUSTOM'
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  subCategory: SubCategoryModel;
  showSpinner = false;
  showFilter = false;
  products: ProductModel[] = [];
  startDate = new Date(2016, 11, 1);
  scId: number;
  searchTerm: string;
  productsCustomFilterDto: ProductsCustomFilterDto = {
    range1: null,
    range2: null,
    take: null,
    skip: null,
    stock: null
  };

  constructor(public helperService: HelperService,
              public store: Store,
              public gdService: GlobalDataService) {

  }

  onSubCategorySelect(subCategory: SubCategoryModel) {
    this.scId = subCategory.id;
    localStorage.setItem('loadType', LoadType.SUB_CATEGORY);
  }

  setRange1(value: number) {
    this.productsCustomFilterDto.range1 = value;
  }

  setRange2(value: number) {
    this.productsCustomFilterDto.range2 = value;
  }

  ngOnInit(): void {
    if (!this.gdService.ShopProducts) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchShopProducts(10)).subscribe(() => {
        this.helperService.hideSpinner();
        this.refreshProducts();
      });
    }
    if (!this.gdService.SubCategories) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchAllSubCategories()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
    localStorage.setItem('loadType', LoadType.SHOP_PRODUCTS);
    this.refreshProducts();
  }

  refreshProducts() {
    this.products = this.gdService.ShopProducts;
  }

  backToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  fetchByTagName() {

  }

  loadCustomProducts() {
    this.setTakeLength(10);
    localStorage.setItem('loadType', LoadType.CUSTOM);
    this.showFilter = true;
    this.store.dispatch(new FetchCustomProducts(this.productsCustomFilterDto)).subscribe(() => {
      this.refreshProducts();
      this.showFilter = false;
    });
  }


  fetchBySubCategoryName(subCategory: SubCategoryModel, slice: number) {
    this.subCategory = Object.assign({}, subCategory);
    this.products = [];
    this.products = [].concat(subCategory.products.slice(0, slice));
    this.showSpinner = false;
  }

  loadMore() {
    const type = localStorage.getItem('loadType');
    this.showSpinner = true;
    switch (type) {
      case LoadType.SHOP_PRODUCTS: {
        this.store.dispatch(new FetchShopProducts(this.products.length + 10)).subscribe(() => {
          this.refreshProducts();
          this.showSpinner = false;
        });
        break;
      }
      case LoadType.CUSTOM: {
        this.productsCustomFilterDto.take = this.products.length + 10;
        this.setSkipLength(this.products.length);
        this.store.dispatch(new FetchCustomProducts(this.productsCustomFilterDto)).subscribe(() => {
          this.refreshProducts();
          this.showSpinner = false;
        });
        break;
      }
      case LoadType.SUB_CATEGORY: {
        setTimeout(() => {
          this.fetchBySubCategoryName(this.subCategory, this.products.length + 5);
        }, 1000);
        break;
      }
    }
  }

  setSkipLength(length: number) {
    this.productsCustomFilterDto.skip = length;
  }

  setTakeLength(length: number) {
    this.productsCustomFilterDto.take = length;
  }


}
