import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {ProductActions, ProductStateModel} from './product.actions';
import {Injectable} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {tap} from 'rxjs/operators';
import {ProductModel} from '../../models/Products/product.model';
import ClearProducts = ProductActions.ClearProducts;
import {patch} from '@ngxs/store/operators';
import FetchMostSalesProducts = ProductActions.FetchMostSalesProducts;
import FetchShopProducts = ProductActions.FetchShopProducts;
import FetchCustomProducts = ProductActions.FetchCustomProducts;
import {SubCategoryService} from '../../services/category/sub-category.service';
import FetchMixLatestProducts = ProductActions.FetchMixLatestProducts;
import AddToCart = ProductActions.AddToCart;
import {CartActions} from '../cart/cart.actions';
import UpdateShopProducts = ProductActions.UpdateShopProducts;
import {CartModel} from '../../models/Cart/cart.model';
import UpdateCartState = CartActions.UpdateCartState;

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    shopProducts: null,
    latestProducts: null,
    mostSalesProducts: null
  }
})

@Injectable()
export class ProductState {
  constructor(private productService: ProductService,
              private subCategoryService: SubCategoryService,
              private store: Store) {
  }

  @Selector()
  static ShopProducts(state: ProductStateModel) {
    return state.shopProducts;
  }

  @Selector()
  static LatestProducts(state: ProductStateModel) {
    return state.latestProducts;
  }

  @Selector()
  static MostSalesProducts(state: ProductStateModel) {
    return state.mostSalesProducts;
  }

  @Action(FetchShopProducts)
  fetchShopProducts(ctx: StateContext<ProductStateModel>, action: FetchShopProducts) {
    return this.productService.getShopProducts(action.take).pipe(
      tap((data: ProductModel[]) => {
        ctx.setState(patch({
          shopProducts: data
        }));
      })
    );
  }

  @Action(UpdateShopProducts)
  updateShopProducts(ctx: StateContext<ProductStateModel>, action: UpdateShopProducts) {
    ctx.setState(patch({
      shopProducts: action.products
    }));
  }

  @Action(FetchMostSalesProducts)
  fetchMostSalesProducts(ctx: StateContext<ProductStateModel>, action: FetchMostSalesProducts) {
    return this.productService.getMostSalesProducts().pipe(
      tap((data: ProductModel[]) => {
        ctx.setState(patch({
          mostSalesProducts: data
        }));
      })
    );
  }

  @Action(FetchCustomProducts)
  fetchCustomProducts(ctx: StateContext<ProductStateModel>, action: FetchCustomProducts) {
    return this.productService.getCustomProducts(action.productsCustomFilterDto).pipe(
      tap((data: ProductModel[]) => {
        ctx.setState(patch({
          shopProducts: data
        }));
      })
    );
  }

  @Action(AddToCart)
  addToCart(ctx: StateContext<ProductStateModel>, action: AddToCart) {
    return this.productService.addToCart(action.productId, action.cartId, action.createCartProductDto).pipe(
      tap((cart: CartModel) => {
        this.store.dispatch(new UpdateCartState(cart));
      })
    );
  }

  @Action(FetchMixLatestProducts)
  fetchMixLatestProducts(ctx: StateContext<ProductStateModel>, action: FetchMixLatestProducts) {
    return this.productService.getMixLatestProducts().pipe(
      tap((data: ProductModel[]) => {
        ctx.setState(patch({
          latestProducts: data
        }));
      })
    );
  }


  @Action(ClearProducts)
  clearProducts(ctx: StateContext<ProductStateModel>, action: ClearProducts) {
    ctx.setState({
      shopProducts: null,
      mostSalesProducts: null,
      latestProducts: null
    });
  }

}
