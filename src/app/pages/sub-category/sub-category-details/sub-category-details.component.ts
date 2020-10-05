import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';

@Component({
  selector: 'app-sub-category-details',
  templateUrl: './sub-category-details.component.html',
  styleUrls: ['./sub-category-details.component.css']
})
export class SubCategoryDetailsComponent implements OnInit {
  showSpinner = false;

  constructor(public helperService: HelperService,
              public router: Router,
              public store: Store,
              private subCategoryService: SubCategoryService,
              public route: ActivatedRoute,
              public gdService: GlobalDataService) {
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
              this.loadProducts(subCategory, 6);
            }
          }
          this.helperService.hideSpinner();
        } else if (this.gdService.SubCategories) {
          this.helperService.showSpinner();
          const subCategoryModel = this.gdService.SubCategories.find(s => s.id === +subCategoryId);
          if (subCategoryModel) {
            this.subCategory = subCategoryModel;
            this.loadProducts(subCategoryModel, 6);
            this.helperService.hideSpinner();
          }
        } else {
          this.helperService.showSpinner();
          this.subCategoryService.getSubCategoryById(+subCategoryId).subscribe((subCategory: SubCategoryModel) => {
            this.subCategory = subCategory;
            this.loadProducts(subCategory, 6);
            this.helperService.hideSpinner();
          });
        }
      }
    });
  }

  products: ProductModel[];

  loadMoreProducts() {
    this.showSpinner = true;
    setTimeout(() => {
      this.loadProducts(this.subCategory, this.subCategory.products.length + 5);
    }, 800);
  }

  subCategory: SubCategoryModel;

  ngOnInit(): void {
  }

  loadProducts(subCategory: SubCategoryModel, slice: number) {
    this.products = subCategory.products.slice(0, slice);
    this.showSpinner = false;
  }

}
