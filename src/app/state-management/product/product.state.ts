import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {ProductActions, ProductStateModel} from './product.actions';
import {Injectable} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {tap} from 'rxjs/operators';
import {ProductModel} from '../../models/Products/product.model';
import ClearProducts = ProductActions.ClearProducts;
import {patch} from '@ngxs/store/operators';
import FetchMostSalesProducts = ProductActions.FetchMostSalesProducts;
import {SubCategoryService} from '../../services/category/sub-category.service';
import FetchMixLatestProducts = ProductActions.FetchMixLatestProducts;
import AddToCart = ProductActions.AddToCart;
import {CartActions} from '../cart/cart.actions';
import {CartModel} from '../../models/Cart/cart.model';
import UpdateCartState = CartActions.UpdateCartState;

@State<ProductStateModel>({
  name: 'products',
  defaults: {
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
  static LatestProducts(state: ProductStateModel) {
    return state.latestProducts;
  }

  @Selector()
  static MostSalesProducts(state: ProductStateModel) {
    return state.mostSalesProducts;
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


  @Action(AddToCart)
  addToCart(ctx: StateContext<ProductStateModel>, action: AddToCart) {
    return this.productService.addToCart(action.productId, action.cartId, action.createCartProductDto).pipe(
      tap((cart: CartModel) => {
        console.log("Cart after add to cart: ", cart);
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
      mostSalesProducts: null,
      latestProducts: null
    });
  }

}
