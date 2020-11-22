import {ProductModel} from '../../models/Products/product.model';
import {ProductsCustomFilterDto} from '../../commons/public-dto/products-custom-filter.dto';

export interface ProductStateModel {
  latestProducts: ProductModel[];
  mostSalesProducts: ProductModel[];
}

export namespace ProductActions {

  export class UpdateShopProducts {
    static readonly type = '[Product] Update Shop Products';

    constructor(public products: ProductModel[]) {
    }
  }

  export class FetchMostSalesProducts {
    static readonly type = '[Product] Fetch Most Sales Products';

    constructor() {
    }
  }

  export class FetchLatestProducts {
    static readonly type = '[Product] Fetch Latest Products';

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

  export class FetchMixLatestProducts {
    static readonly type = '[Product] Fetch Mix Latest Products';

    constructor() {
    }
  }

  export class FetchCustomProducts {
    static readonly type = '[Product] Fetch Custom Products';

    constructor(public productsCustomFilterDto: ProductsCustomFilterDto) {
    }
  }

  export class AddToCart {
    static readonly type = '[Product] Add To Cart';

    constructor(public productId: number, public cartId: number, public createCartProductDto: { quantity: number }) {
    }
  }


  export class ClearProducts {
    static readonly type = '[Product] Clear Products';

    constructor() {
    }
  }

}
