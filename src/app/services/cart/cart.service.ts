import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {CartModel} from '../../models/Cart/cart.model';
import {RemoveCartItem} from '../../commons/interfaces/remove-cart-item.interface';
import {CheckoutReturnData} from '../../commons/interfaces/checkout-return-data';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient) {
  }

  getUserCart(): Observable<CartModel> {
    return this._http.get<CartModel>(`${ApiEndpoints.CartEndpoints.rootCart}/user-cart`);
  }

  createUserCart(): Observable<CartModel> {
    return this._http.post<CartModel>(`${ApiEndpoints.CartEndpoints.rootCart}/create-user-cart`, null);
  }

  checkoutOnCart(payload: { createPaymentDto: any, createOrderDto: any }): Observable<CheckoutReturnData> {
    return this._http.post<CheckoutReturnData>
    (`${ApiEndpoints.CartEndpoints.rootCart}/checkout-on-cart`, payload);
  }

  checkoutOnSingleProduct(cartProductId: number, payload: any): Observable<CheckoutReturnData> {
    return this._http.post<CheckoutReturnData>
    (`${ApiEndpoints.CartEndpoints.rootCart}/checkout-on-single-product/${cartProductId}`, payload);
  }

  clearCart(): Observable<CartModel> {
    return this._http.delete<CartModel>(`${ApiEndpoints.CartEndpoints.rootCart}/clear-cart`);
  }

  updateCartProductQuantity(cartId: number, cartProductId: number, newQuantity: number) {
    let params = new HttpParams();
    params = params.append('newQuantity', newQuantity.toString());
    return this._http.put(`${ApiEndpoints.CartEndpoints.rootCart}/${cartId}/update-product-cart-quantity/${cartProductId}`, null, {
      params
    });
  }
  removeCartProductFromCart(cartId: number,
                            cartProductId: number) {
    return this._http.delete(`${ApiEndpoints.CartEndpoints.rootCart}/${cartId}/remove-product-from-cart/${cartProductId}`);
  }

  removeProductsFromCart(removedData: { cartProducts: RemoveCartItem[] }): Observable<CartModel> {
    return this._http
      .request<CartModel>('delete', `${ApiEndpoints.CartEndpoints.rootCart}/remove-products-from-cart`, {
        body: {
          removedData
        }
      });
  }

}
