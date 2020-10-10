import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';

@Component({
  selector: 'app-tag-items',
  templateUrl: './tag-items.component.html',
  styleUrls: ['./tag-items.component.css']
})
export class TagItemsComponent implements OnInit {

  subCategories: SubCategoryModel[];
  searchedTag: string;

  constructor(public store: Store, private router: Router,
              private route: ActivatedRoute,
              public gdService: GlobalDataService,
              private subCategoryService: SubCategoryService,
              public helperService: HelperService) {
    helperService.showSpinner();
    route.paramMap.subscribe((params: ParamMap) => {
      const tagName = params.get('name');
      if (tagName) {
        this.searchedTag = tagName;
        this.subCategoryService.getSubCategoriesByTagName(tagName)
          .subscribe((subCategories: SubCategoryModel[]) => {
            this.subCategories = subCategories;
            helperService.hideSpinner();
          });
      }
    });
  }

  navigateToSubCategory(subCategory: SubCategoryModel) {
    this.router.navigate([`/sub-categories/${subCategory.categoryId}`, subCategory.id], {
      queryParams: {
        Tag: this.searchedTag,
        subCategory: subCategory.name
      }
    });
  }

  ngOnInit(): void {
  }

}
