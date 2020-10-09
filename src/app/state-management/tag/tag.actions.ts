import {SubCategoryTagModel} from '../../models/Categories/sub-category-tag.model';
import {ProductTagModel} from '../../models/Products/product-tag.model';

export interface TagStateModel {
  subCategoriesTags: SubCategoryTagModel[];
  productsTags: ProductTagModel[]
}

export namespace TagActions {
  export class FetchSubCategoriesTags {
    static readonly type = '[Tag] Fetch SubCategories Tags';

    constructor() {
    }
  }

  export class FetchProductsTags {
    static readonly type = '[Tag] Fetch Products Tags';

    constructor() {
    }
  }

  export class FetchTagById {
    static readonly type = '[Tag] Fetch Tag By Id';

    constructor(public id: number) {
    }
  }


  export class ClearTags {
    static readonly type = '[Tag] Clear Tags';

    constructor() {
    }
  }

}
