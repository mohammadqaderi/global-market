import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {CartActions} from '../../../state-management/cart/cart.actions';
import CreateUserCart = CartActions.CreateUserCart;
import FetchUserCart = CartActions.FetchUserCart;

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  state: string;

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

  get Cart() {
    return this.gdService.Cart;
  }

}
