import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;

@Component({
  selector: 'app-sub-category-details',
  templateUrl: './sub-category-details.component.html',
  styleUrls: ['./sub-category-details.component.css']
})
export class SubCategoryDetailsComponent implements OnInit {

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
            }
          }
          this.helperService.hideSpinner();
        } else if (this.gdService.SubCategories) {
          const subCategoryModel = this.gdService.SubCategories.find(s => s.id === +subCategoryId);
          if (subCategoryModel) {
            this.subCategory = subCategoryModel;
            this.helperService.hideSpinner();
          }
        } else {
          this.subCategoryService.getSubCategoryById(+subCategoryId).subscribe((subCategory: SubCategoryModel) => {
            this.subCategory = subCategory;
            this.helperService.hideSpinner();
          });
        }
      }
    });
  }

  subCategory: SubCategoryModel;

  ngOnInit(): void {
  }

}
