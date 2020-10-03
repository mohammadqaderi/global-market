import {ProductModel} from '../../models/Products/product.model';

export interface ProductStateModel {
  shopProducts: ProductModel[];
  currentMonthProducts: ProductModel[];
  mostSalesProducts: ProductModel[];
}

export namespace ProductActions {
  export class FetchShopProducts {
    static readonly type = '[Product] Fetch Shop Products';

    constructor(public take: number) {
    }
  }

  export class FetchMostSalesProducts {
    static readonly type = '[Product] Fetch Most Sales Products';

    constructor() {
    }
  }

  export class FetchMonthProducts {
    static readonly type = '[Product] Fetch Month Products';

    constructor() {
    }
  }

  export class FetchProductsByTagName {
    static readonly type = '[Product] Fetch Products By Tag Name';

    constructor(public tagName: string) {
    }
  }

  export class FetchProductById {
    static readonly type = '[Product] Fetch Product By Id';

    constructor(public id: number) {
    }
  }

  export class FetchFilteredProductsByRange {
    static readonly type = '[Product] Fetch Filtered Products By Range';

    constructor(public range1: number, public range2: number) {
    }
  }

  export class FetchProductsByStockExistence {
    static readonly type = '[Product] Fetch Products By Stock Existence';

    constructor(public stock: boolean) {
    }
  }


  export class AddToCart {
    static readonly type = '[Product] Add To Cart';

    constructor(public productId: number, public cartId: number) {
    }
  }


  export class ClearProducts {
    static readonly type = '[Product] Clear Products';

    constructor() {
    }
  }

}
