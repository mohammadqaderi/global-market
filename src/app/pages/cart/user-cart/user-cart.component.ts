import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {CartActions} from '../../../state-management/cart/cart.actions';
import CreateUserCart = CartActions.CreateUserCart;
import FetchUserCart = CartActions.FetchUserCart;
import {CartProductModel} from '../../../models/Cart/cart-product.model';
import {ProductModel} from '../../../models/Products/product.model';
import UpdateCartProductQuantity = CartActions.UpdateCartProductQuantity;
import RemoveProductsFromCart = CartActions.RemoveProductsFromCart;
import RemoveCartProduct = CartActions.RemoveCartProduct;

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  state: string;
  showSpinner = false;
  showSaveChanges = false;

  constructor(private store: Store, public helperService: HelperService,
              public gdService: GlobalDataService) {
  }

  ngOnInit(): void {
    if (!this.gdService.User.cartId) {
      this.state = 'Initializing Cart...';
      this.helperService.showSpinner();
      this.store.dispatch(new CreateUserCart()).subscribe(() => {
        this.helperService.hideSpinner();
        this.state = null;
      });
    } else if (!this.gdService.Cart) {
      this.state = 'Loading Cart...';
      this.helperService.showSpinner();
      this.store.dispatch(new FetchUserCart()).subscribe(() => {
        this.helperService.hideSpinner();
        this.state = null;
      });
    }
  }

  totalPurchase() {
    let total = 0;
    for (let i = 0; i < this.Cart.cartProducts.length; i++) {
      total += this.Cart.cartProducts[i].totalPrice;
    }
    return total;
  }

  get Cart() {
    return this.gdService.Cart;
  }


  updateCartProductQuantity(cartProduct: CartProductModel) {
    this.showSaveChanges = false;
    this.showSpinner = true;
    this.store.dispatch(new UpdateCartProductQuantity(this.Cart.id, cartProduct.id, cartProduct.quantity)).subscribe(() => {
      this.showSpinner = false;
    });
  }

  removeCartProduct(cartProduct: CartProductModel) {
    this.state = 'Remove product...';
    this.helperService.showSpinner();
    this.store.dispatch(new RemoveCartProduct(this.Cart.id, cartProduct.id)).subscribe(() => {
      this.state = null;
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Product removed successfully from your cart', 'Close');
    });
  }

  ignore() {
    this.showSpinner = false;
    this.showSaveChanges = false;
    this.store.dispatch(new FetchUserCart()).subscribe(() => {
    })
  }

  getCartProductReference(id: number): ProductModel {
    let product: ProductModel = null;
    if (this.gdService.ShopProducts) {
      product = this.gdService.ShopProducts.find(p => p.id === id);
      if (product) {
        return product;
      }
    }
    if (this.gdService.MonthProducts) {
      product = this.gdService.MonthProducts.find(p => p.id === id);
      if (product) {
        return product;
      }
    }
    if (this.gdService.MostSalesProducts) {
      product = this.gdService.MostSalesProducts.find(p => p.id === id);
      if (product) {
        return product;
      }
    } else {
      for (let i = 0; i < this.gdService.SubCategories.length; i++) {
        for (let j = 0; j < this.gdService.SubCategories[i].products.length; j++) {
          if (this.gdService.SubCategories[i].products[j].id === id) {
            product = this.gdService.SubCategories[i].products[j];
            return product;
          }
        }
      }
    }
  }

  onAdd(cartProduct: CartProductModel) {
    const product = this.getCartProductReference(cartProduct.productId);
    if (product && cartProduct.quantity <= product.quantity) {
      this.showSaveChanges = true;
      cartProduct.quantity += 1;
    } else {
      return;
    }
  }

  onSubtract(cartProduct: CartProductModel) {
    if (cartProduct.quantity === 1) {
      return;
    }
    this.showSaveChanges = true;
    cartProduct.quantity -= 1;
  }
}
