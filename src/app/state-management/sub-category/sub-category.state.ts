import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {SubCategoryActions, SubCategoryStateModel} from './sub-category.actions';
import {Injectable} from '@angular/core';
import {SubCategoryService} from '../../services/category/sub-category.service';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import {tap} from 'rxjs/operators';
import {SubCategoryModel} from '../../models/Categories/sub-category.model';
import ClearSubCategory = SubCategoryActions.ClearSubCategory;
import {CategoryService} from '../../services/category/category.service';


@State<SubCategoryStateModel>({
  name: 'subCategories',
  defaults: {
    subCategories: null
  }
})
@Injectable()
export class SubCategoryState {
  constructor(private subCategoryService: SubCategoryService, private categoryService: CategoryService,
              private store: Store) {
  }

  @Selector()
  static SubCategories(state: SubCategoryStateModel) {
    return state.subCategories;
  }

  @Action(FetchAllSubCategories)
  fetchAllSubCategories(ctx: StateContext<SubCategoryStateModel>, action: FetchAllSubCategories) {
    return this.subCategoryService.getAllSubCategories().pipe(
      tap((data: SubCategoryModel[]) => {
        ctx.setState({
          subCategories: data
        });
      })
    );
  }

  getCloneSubCategory(id: number) {
    return Object.assign({},
      this.store.selectSnapshot(SubCategoryState.SubCategories).find(sub => sub.id === id));
  }


  @Action(ClearSubCategory)
  clearSubCategories(ctx: StateContext<SubCategoryStateModel>, action: ClearSubCategory) {
    ctx.setState({
      subCategories: null
    });
  }

}
