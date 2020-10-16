import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {CategoryActions} from '../../state-management/category/category.actions';
import FetchAllCategories = CategoryActions.FetchAllCategories;
import {MatSidenav} from '@angular/material/sidenav';
import {CategoryModel} from '../../models/Categories/category.model';
import {SubCategoryModel} from '../../models/Categories/sub-category.model';
import {Router} from '@angular/router';
import {fromEvent, Observable} from 'rxjs';
import {TagActions} from '../../state-management/tag/tag.actions';
import FetchSubCategoriesTags = TagActions.FetchSubCategoriesTags;
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(public gdService: GlobalDataService, public store: Store,
              private router: Router) {
  }

  @Input() sidenav: MatSidenav;
  @Input() isHandset$: Observable<boolean>;

  ngOnInit(): void {
    if (!this.gdService.Categories) {
      this.store.dispatch(new FetchAllCategories()).subscribe(() => {
      });
    }
    if (!this.gdService.SubCategories) {
      this.store.dispatch(new FetchSubCategoriesTags()).subscribe(() => {
      });
    }

  }

  navigateToSubCategory(category: CategoryModel, subCategory: SubCategoryModel) {
    this.router.navigate([`/sub-categories/${category.id}`, subCategory.id], {
      queryParams: {
        Department: category.name,
        subCategory: subCategory.name
      }
    });
  }
}
