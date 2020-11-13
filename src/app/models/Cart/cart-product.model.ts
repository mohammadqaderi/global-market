import {CartModel} from './cart.model';

export class CartProductModel  {
  id: number;
  name: string;


  image: string;

  cart: CartModel;

  totalPrice: number;

  cartId: number;

  quantity: number;

  maxPush: number;

  productId: number;
}
