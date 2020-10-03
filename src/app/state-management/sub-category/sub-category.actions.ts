import {SubCategoryModel} from '../../models/Categories/sub-category.model';

export interface SubCategoryStateModel {
  subCategories: SubCategoryModel[];
}

export namespace SubCategoryActions {
  export class FetchAllSubCategories {
    static readonly type = '[SubCategory] Fetch All Sub Categories';

    constructor() {
    }
  }

  export class FetchSubCategoryById {
    static readonly type = '[SubCategory] Fetch SubCategory By Id';

    constructor(public id: number) {
    }
  }

  export class FetchSubCategoriesByTagName {
    static readonly type = '[SubCategory] Fetch SubCategories By Tag Name';

    constructor(public tagName: string) {
    }
  }


  export class ClearSubCategory {
    static readonly type = '[SubCategory] Clear SubCategory';

    constructor() {
    }
  }


}
