import {CategoryModel} from '../../models/Categories/category.model';

export interface CategoryStateModel {
  categories: CategoryModel[];
}

export namespace CategoryActions {

  export class FetchAllCategories {
    static readonly type = '[Category] Fetch All Categories';

    constructor() {
    }
  }

  export class FetchCategoryById {
    static readonly type = '[Category] Fetch Category By Id';

    constructor(public id: number) {
    }
  }


  export class ClearCategory {
    static readonly type = '[Category] Clear Category';

    constructor() {
    }
  }



}
