import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Store} from '@ngxs/store';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {CartActions} from '../../../state-management/cart/cart.actions';
import CreateUserCart = CartActions.CreateUserCart;
import FetchUserCart = CartActions.FetchUserCart;
import {CartProductModel} from '../../../models/Cart/cart-product.model';
import UpdateCartProductQuantity = CartActions.UpdateCartProductQuantity;
import RemoveCartProduct = CartActions.RemoveCartProduct;

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  state: string;
  showSpinner = false;
  showSaveChanges = false;
  selectedItem: CartProductModel;


  constructor(private store: Store, public helperService: HelperService,
              public gdService: GlobalDataService) {
  }

  setSelectedItem(item: CartProductModel) {
    this.selectedItem = Object.assign({}, item);
  }

  ngOnInit(): void {
    if (!this.gdService.User.cartId) {
      this.state = 'Initializing Cart...';
      this.helperService.showSpinner();
      this.store.dispatch(new CreateUserCart()).subscribe(() => {
        this.helperService.hideSpinner();
        this.state = null;
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    } else if (!this.gdService.Cart) {
      this.state = 'Loading Cart...';
      this.helperService.showSpinner();
      this.store.dispatch(new FetchUserCart()).subscribe(() => {
        this.helperService.hideSpinner();
        this.state = null;
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
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
    this.store.dispatch(new UpdateCartProductQuantity(this.Cart.id, cartProduct.id, this.selectedItem.quantity)).subscribe(() => {
      this.helperService.hideModal();
      this.showSpinner = false;
      this.selectedItem = null;
    }, error => {
      this.helperService.hideModal();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  removeCartProduct(cartProduct: CartProductModel) {
    this.state = 'Remove product...';
    this.helperService.showSpinner();
    this.store.dispatch(new RemoveCartProduct(this.Cart.id, cartProduct.id)).subscribe(() => {
      this.state = null;
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Product removed successfully from your cart', 'Close');
    }, error => {
      this.helperService.hideModal();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }



  onAdd(cartProduct: CartProductModel) {
    if (cartProduct.quantity <= cartProduct.maxPush) {
      this.showSaveChanges = true;
      this.selectedItem.quantity += 1;
    } else {
      return;
    }
  }

  onSubtract(cartProduct: CartProductModel) {
    if (cartProduct.quantity === 1) {
      return;
    }
    this.showSaveChanges = true;
    this.selectedItem.quantity -= 1;
  }
}
