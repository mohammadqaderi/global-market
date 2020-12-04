import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';
import {ProductTagModel} from '../../../models/Products/product-tag.model';
import {productsTagsInit} from '../../../commons/helpers/functions/products-tags-init';

@Component({
  selector: 'app-sub-category-details',
  templateUrl: './sub-category-details.component.html',
  styleUrls: ['./sub-category-details.component.css']
})
export class SubCategoryDetailsComponent implements OnInit {
  showSpinner = false;
  selectedTag: number;
  isAllSelected = true;

  constructor(public helperService: HelperService,
              public router: Router,
              public store: Store,
              private subCategoryService: SubCategoryService,
              public route: ActivatedRoute,
              public gdService: GlobalDataService) {

  }

  products: ProductModel[];
  productsTags: ProductTagModel[];

  onTagSelect(productTag: ProductTagModel) {
    this.selectedTag = productTag.id;
    this.isAllSelected = false;
    let products = [];
    let dressesProducts = [];
    for (let i = 0; i < this.subCategory.products.length; i++) {
      if (productTag.name === 'Dresses') {
        dressesProducts = [...dressesProducts, this.subCategory.products[i]];
      }
      const item = this.subCategory.products[i].productTags.find(pTag => pTag.name === productTag.name);
      if (item) {
        products = [...products, this.subCategory.products[i]];
      }
    }
    this.products = products;
  }

  subCategory: SubCategoryModel;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let subCategoryId = params.get('subCategoryId');
      let categoryId = params.get('categoryId');
      if (!!subCategoryId && !!subCategoryId) {
        this.helperService.showSpinner();
        if (this.gdService.Categories) {
          const category = this.gdService.Categories.find(c => c.id === +categoryId);
          if (category) {
            const subCategory = category.subCategories.find(s => s.id === +subCategoryId);
            if (subCategory) {
              this.subCategory = subCategory;
              this.loadProducts(subCategory);
              this.productsTags = productsTagsInit(this.subCategory);
            }
          } else if (this.gdService.SubCategories) {
            this.helperService.showSpinner();
            const subCategoryModel = this.gdService.SubCategories.find(s => s.id === +subCategoryId);
            if (subCategoryModel) {
              this.subCategory = subCategoryModel;
              this.loadProducts(subCategoryModel);
              this.productsTags = productsTagsInit(this.subCategory);
              this.helperService.hideSpinner();
            }
          }
          this.helperService.hideSpinner();
        } else {
          this.helperService.showSpinner();
          this.subCategoryService.getSubCategoryById(+subCategoryId).subscribe((subCategory: SubCategoryModel) => {
            this.subCategory = subCategory;
            this.loadProducts(subCategory);
            this.productsTags = productsTagsInit(this.subCategory);
            this.helperService.hideSpinner();
          });
        }
      }
    });
  }

  getAll() {
    this.selectedTag = null;
    this.isAllSelected = true;
    this.loadProducts(this.subCategory);
  }

  loadProducts(subCategory: SubCategoryModel) {
    this.products = subCategory.products;
    this.showSpinner = false;
  }

}
