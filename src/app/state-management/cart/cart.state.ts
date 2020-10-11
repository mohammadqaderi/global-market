import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CartActions, CartStateModel} from './cart.actions';
import {CartService} from '../../services/cart/cart.service';
import FetchUserCart = CartActions.FetchUserCart;
import {tap} from 'rxjs/operators';
import {CartModel} from '../../models/Cart/cart.model';
import CreateUserCart = CartActions.CreateUserCart;
import ClearCartFromStorage = CartActions.ClearCartFromStorage;
import ClearCartContent = CartActions.ClearCartContent;
import CheckoutOnCart = CartActions.CheckoutOnCart;
import {CheckoutReturnData} from '../../commons/interfaces/checkout-return-data';
import CheckoutOnSingleProduct = CartActions.CheckoutOnSingleProduct;
import RemoveProductsFromCart = CartActions.RemoveProductsFromCart;
import {SetUserCart} from '../auth/auth-actions';
import AddProductToCart = CartActions.AddProductToCart;
import {patch} from '@ngxs/store/operators';
import {InvoiceActions} from '../invoice/invoice.actions';
import PushInvoice = InvoiceActions.PushInvoice;
import {OrderActions} from '../order/order.actions';
import PushOrder = OrderActions.PushOrder;
import {PaymentActions} from '../payment/payment.actions';
import PushPayment = PaymentActions.PushPayment;
import {AuthState} from '../auth/auth.state';
import SetCustomerToken = PaymentActions.SetCustomerToken;
import UpdateCartProductQuantity = CartActions.UpdateCartProductQuantity;
import RemoveCartProduct = CartActions.RemoveCartProduct;


@State<CartStateModel>({
  name: 'cart',
  defaults: {
    cart: null
  }
})
@Injectable()
export class CartState {
  constructor(private cartService: CartService, private store: Store) {
  }

  @Selector()
  static Cart(state: CartStateModel) {
    return state.cart;
  }

  @Action(FetchUserCart)
  fetchUserCart(ctx: StateContext<CartStateModel>, action: FetchUserCart) {
    return this.cartService.getUserCart().pipe(
      tap((cart: CartModel) => {
        ctx.setState({
          cart
        });
      })
    );
  }

  @Action(CreateUserCart)
  createUserCart(ctx: StateContext<CartStateModel>, action: CreateUserCart) {
    return this.cartService.createUserCart().pipe(
      tap((cart: CartModel) => {
        ctx.setState({
          cart
        });
        this.store.dispatch(new SetUserCart(cart.id));
      })
    );
  }

  @Action(ClearCartContent)
  clearCartContent(ctx: StateContext<CartStateModel>, action: ClearCartContent) {
    return this.cartService.clearCart().pipe(
      tap((cart: CartModel) => {
        ctx.setState({
          cart
        });
      })
    );
  }

  @Action(AddProductToCart)
  addProductToCart(ctx: StateContext<CartStateModel>, action: AddProductToCart) {
    const cart = Object.assign({}, ctx.getState().cart);
    cart.cartProducts = [...cart.cartProducts, action.productCart];
    cart.totalItems += 1;
    ctx.setState(patch({
      cart
    }));
  }

  @Action(UpdateCartProductQuantity)
  updateCartProductQuantity(ctx: StateContext<CartStateModel>, action: UpdateCartProductQuantity) {
    return this.cartService.updateCartProductQuantity(action.cartId, action.cartProductId, action.newQuantity).pipe(
      tap((cart: CartModel) => {
        ctx.patchState({
          cart
        });
      })
    );
  }

  @Action(RemoveCartProduct)
  removeCartProduct(ctx: StateContext<CartStateModel>, action: RemoveCartProduct) {
    return this.cartService.removeCartProductFromCart(action.cartId, action.cartProductId).pipe(
      tap((cart: CartModel) => {
        ctx.patchState({
          cart
        });
      })
    );
  }

  @Action(CheckoutOnCart)
  checkoutOnCart(ctx: StateContext<CartStateModel>, action: CheckoutOnCart) {
    return this.cartService.checkoutOnCart(action.payload).pipe(
      tap((result: CheckoutReturnData) => {
        if (result) {
          const {cart, customerId} = result;
          ctx.patchState({
            cart
          });
          this.afterCheckoutComplete(result);
          if (!this.store.selectSnapshot(AuthState.User).stripeId) {
            this.store.dispatch(new SetCustomerToken(customerId));
          }
        }
      })
    );
  }

  afterCheckoutComplete(result: CheckoutReturnData) {
    const {order, invoice, payment} = result;
    this.store.dispatch(new PushInvoice(invoice));
    this.store.dispatch(new PushPayment(payment));
    this.store.dispatch(new PushOrder(order));
  }


  @Action(CheckoutOnSingleProduct)
  checkoutOnSingleProduct(ctx: StateContext<CartStateModel>, action: CheckoutOnSingleProduct) {
    return this.cartService.checkoutOnSingleProduct(action.cartProductId, action.payload).pipe(
      tap((result: CheckoutReturnData) => {
        if (result) {
          const {cart} = result;
          ctx.patchState({
            cart
          });
          this.afterCheckoutComplete(result);
        }
      })
    );
  }

  @Action(RemoveProductsFromCart)
  removeProductsFromCart(ctx: StateContext<CartStateModel>, action: RemoveProductsFromCart) {
    return this.cartService.removeProductsFromCart(action.payload).pipe(
      tap((cart: CartModel) => {
        ctx.patchState({
          cart
        });
      })
    );
  }

  @Action(ClearCartFromStorage)
  clearCartFromStorage(ctx: StateContext<CartStateModel>, action: ClearCartFromStorage) {
    ctx.setState({
      cart: null
    });
  }
}
