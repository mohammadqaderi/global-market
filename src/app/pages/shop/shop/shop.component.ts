import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import {MatPaginator} from '@angular/material/paginator';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';
import {ProductsCustomFilterDto} from '../../../commons/public-dto/products-custom-filter.dto';
import {SubCategoryTagModel} from '../../../models/Categories/sub-category-tag.model';
import {TagActions} from '../../../state-management/tag/tag.actions';
import FetchSubCategoriesTags = TagActions.FetchSubCategoriesTags;
import {ProductService} from '../../../services/product/product.service';
import {BehaviorSubject} from 'rxjs';
import {ProductTagModel} from '../../../models/Products/product-tag.model';
import {productsTagsInit} from '../../../commons/helpers/functions/products-tags-init';

export enum LoadType {
  SHOP = 'SHOP',
  CUSTOM = 'CUSTOM'
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  productsTags: ProductTagModel[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  subCategory: SubCategoryModel;
  showSpinner = false;
  showFilter = false;
  products: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
  subCategoryTag: SubCategoryTagModel;
  selectedTag: number;
  isAllSelected = true;
  scId: number;
  searchTerm: string;
  productsCustomFilterDto: ProductsCustomFilterDto = {
    range1: null,
    range2: null,
    limit: 10,
    page: 1,
    subCategoryId: null,
    tag: null,
    stock: null
  };

  onPageChange(page: any) {
    this.loadProducts(page);
  }

  fetchingType = LoadType.SHOP;


  loadByAvailability() {
    this.initializeCustom();
  }

  onSubCategorySelect(subCategory: SubCategoryModel) {
    this.scId = subCategory.id;
    this.clearSelectedTag();
    this.subCategory = Object.assign({}, subCategory);
    this.productsTags = productsTagsInit(this.subCategory);
    this.productsCustomFilterDto.subCategoryId = subCategory.id;
    this.initializeCustom();
  }

  onTagSelect(tag: ProductTagModel) {
    this.selectedTag = tag.id;
    this.isAllSelected = null;
    this.productsCustomFilterDto.tag = tag.name;
    this.initializeCustom();

  }

  clearSelectedTag() {
    this.selectedTag = null;
    this.productsCustomFilterDto.tag = null;
    this.isAllSelected = true;

  }

  onAllTagSelect() {
    this.clearSelectedTag();
    this.initializeCustom();
  }

  initializeCustom() {
    this.fetchingType = LoadType.CUSTOM;
    this.gdService.currentPage = this.productsCustomFilterDto.page;
    this.loadProducts(this.gdService.currentPage);
  }

  onMinRangeSelect(minRange: number) {
    this.productsCustomFilterDto.range1 = minRange;
    this.initializeCustom();
  }

  onMaxRangeSelect(maxRange: number) {
    this.productsCustomFilterDto.range2 = maxRange;
    this.initializeCustom();
  }

  constructor(public helperService: HelperService,
              public store: Store,
              private productService: ProductService,
              public gdService: GlobalDataService) {

  }


  ngOnInit(): void {
    if (!this.gdService.SubCategoriesTags) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchSubCategoriesTags()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
    if (!this.gdService.SubCategories) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchAllSubCategories()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
    this.helperService.showSpinner();
    this.loadProducts(1);
  }


  loadProducts(page: number) {
    if (this.fetchingType === LoadType.SHOP) {
      this.productService.getShopProducts(10, page).subscribe((result) => {
        this.products.next(result.products);
        this.gdService.setPaginationData(result);
        this.helperService.hideSpinner();
      });
    } else {
      this.productsCustomFilterDto.page = page;
      this.productService.getCustomProducts(this.productsCustomFilterDto).subscribe((result) => {
        this.products.next(result.products);
        this.gdService.setPaginationData(result);
        this.helperService.hideSpinner();
      });
    }

  }




}
