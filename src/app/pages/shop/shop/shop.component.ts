import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {Select, Store} from '@ngxs/store';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {ProductActions} from '../../../state-management/product/product.actions';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import FetchShopProducts = ProductActions.FetchShopProducts;
import {MatPaginator} from '@angular/material/paginator';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';
import {GetProductsByRangeDto} from '../../../commons/public-dto/get-products-by-range.dto';
import FetchFilteredProductsByRange = ProductActions.FetchFilteredProductsByRange;

export enum LoadType {
  RANGE = 'RANGE',
  SHOP_PRODUCTS = 'SHOP_PRODUCTS',
  SUB_CATEGORY = 'SUBCATEGORY',

}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  getProductsByRangeDto: GetProductsByRangeDto = {
    range1: null,
    range2: null,
    take: null,
    skip: null
  };
  type: any;
  dateForm = {
    date: null
  };
  showSpinner = false;
  products: ProductModel[] = [];
  startDate = new Date(2016, 11, 1);
  scId: number;

  constructor(public helperService: HelperService,
              public store: Store,
              public gdService: GlobalDataService) {

  }

  onSubCategorySelect(subCategory: SubCategoryModel) {
    this.scId = subCategory.id;
  }

  setRange1(value: number) {
    this.getProductsByRangeDto.range1 = value;
    this.fetchByRanges();
  }

  setRange2(value: number) {
    this.getProductsByRangeDto.range2 = value;
    this.fetchByRanges();
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
    this.type = LoadType.SHOP_PRODUCTS;
    this.refreshProducts();
  }

  refreshProducts() {
    this.products = this.gdService.ShopProducts;
  }

  fetchByTagName() {

  }

  fetchBySubCategoryName(subCategory: SubCategoryModel) {
    this.products = [];
    this.products = [].concat(subCategory.products.slice(0, 10));
  }

  fetchByRanges() {
    if (!this.getProductsByRangeDto.range1) {
      return;
    }
    if (!this.getProductsByRangeDto.range2) {
      return;
    }
    this.type = LoadType.RANGE;
    this.getProductsByRangeDto.take = 15;
    this.helperService.showSpinner();
    this.store.dispatch(new FetchFilteredProductsByRange(this.getProductsByRangeDto)).subscribe(() => {
      this.refreshProducts();
      this.helperService.hideSpinner();
    });
  }

  loadMore() {
    this.showSpinner = true;
    switch (this.type) {
      case LoadType.SHOP_PRODUCTS: {
        this.store.dispatch(new FetchShopProducts(this.products.length + 10)).subscribe(() => {
          this.refreshProducts();
          this.showSpinner = false;
        });
        break;
      }
      case LoadType.RANGE: {
        this.getProductsByRangeDto.take = this.products.length + 10;
        this.store.dispatch(new FetchFilteredProductsByRange(this.getProductsByRangeDto)).subscribe(() => {
          this.refreshProducts();
          this.showSpinner = false;
        });
        break;
      }
      case LoadType.SUB_CATEGORY: {
        break;
      }
    }
  }

}
