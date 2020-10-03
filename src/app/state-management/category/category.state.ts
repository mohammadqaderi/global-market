import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {CategoryActions, CategoryStateModel} from './category.actions';
import {CategoryService} from '../../services/category/category.service';
import FetchAllCategories = CategoryActions.FetchAllCategories;
import {CategoryModel} from '../../models/Categories/category.model';
import ClearCategory = CategoryActions.ClearCategory;

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: null
  }
})
@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService, private store: Store) {
  }

  @Selector()
  static Categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Action(FetchAllCategories)
  fetchAllCategories(ctx: StateContext<CategoryStateModel>, action: FetchAllCategories) {
    return this.categoryService.getAllCategories().pipe(
      tap((categories: CategoryModel[]) => {
        ctx.setState({
          categories
        });
      })
    );
  }


  private getCloneCategory(id: number) {
    return Object.assign({}, this.store.selectSnapshot(CategoryState.Categories)
      .find(category => category.id === id));
  }



  @Action(ClearCategory)
  clearCategories(ctx: StateContext<CategoryStateModel>, action: ClearCategory) {
    ctx.setState({
      categories: null
    });
  }



}
