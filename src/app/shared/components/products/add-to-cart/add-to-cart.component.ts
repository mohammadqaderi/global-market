import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HelperService} from '../../../services/helper.service';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../../services/global-data.service';
import {ProductModel} from '../../../../models/Products/product.model';
import {CartActions} from '../../../../state-management/cart/cart.actions';
import FetchUserCart = CartActions.FetchUserCart;
import {ProductActions} from '../../../../state-management/product/product.actions';
import AddToCart = ProductActions.AddToCart;

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() product: ProductModel;
  quantity: number = 1;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(public helperService: HelperService,
              private store: Store,
              public gdService: GlobalDataService) {
  }

  ngOnInit(): void {
    if (!this.gdService.Cart) {
      this.store.dispatch(new FetchUserCart()).subscribe(() => {
      });
    }
  }


  checkValue(quantityValue: HTMLInputElement) {
    const currentValue = parseFloat(quantityValue.value);
    if (currentValue >= 10) {
      quantityValue.value = (10).toString();
      return;
    }
    if (currentValue <= 0) {
      quantityValue.value = (0).toString();
      return;
    }
  }

  onAdd() {
    if (this.quantity >= 10) {
      return;
    }
    this.quantity += 1;

  }


  onSubtract() {
    if (this.quantity === 0) {
      return;
    }
    this.quantity -= 1;
  }


  addToCart() {
    this.helperService.showSpinner();
    this.store.dispatch(new AddToCart(this.product.id, this.gdService.Cart.id)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Product added successfully into your cart', 'Close');
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

}
