import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(public helperService: HelperService,
              public router: Router,
              public store: Store,
              public route: ActivatedRoute,
              public gdService: GlobalDataService) {
    this.helperService.showSpinner();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const productId = +params.get('productId');
      const subCategoryId = +params.get('subCategoryId');
      if (this.gdService.SubCategories) {
        const subCategory = this.gdService.SubCategories.find(sc => sc.id === subCategoryId);
        if (subCategory) {
          this.subCategory = subCategory;
          const product = subCategory.products.find(p => p.id === productId);
          if (product) {
            this.product = product;
            this.selectedImage = product.images[0];
          }
        }
      }
      this.helperService.hideSpinner();
    });
  }

  selectedImage: string;

  setSelectedImage(image: string) {
    this.selectedImage = image;
  }

  subCategory: SubCategoryModel;
  product: ProductModel;

  ngOnInit(): void {
    if (!this.gdService.SubCategories) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchAllSubCategories()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
  }

}
