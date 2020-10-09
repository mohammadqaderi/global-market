import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {PaymentActions, PaymentStateModel} from './payment.actions';
import {PaymentService} from '../../services/payment/payment.service';
import {PaymentModel} from '../../models/Payments/payment.model';
import FetchUserPayments = PaymentActions.FetchUserPayments;
import ClearPaymentsFromStorage = PaymentActions.ClearPaymentsFromStorage;
import PushPayment = PaymentActions.PushPayment;
import {append, patch} from '@ngxs/store/operators';
import SetCustomerToken = PaymentActions.SetCustomerToken;
import {UserModel} from '../../models/Auth/user.model';
import {UpdateUser} from '../auth/auth-actions';


@State<PaymentStateModel>({
  name: 'payments',
  defaults: {
    payments: []
  }
})

@Injectable()
export class PaymentState {
  constructor(private paymentService: PaymentService, private store: Store) {
  }

  @Selector()
  static Payments(state: PaymentStateModel) {
    return state.payments;
  }

  @Action(ClearPaymentsFromStorage)
  clearPaymentsFromStorage(ctx: StateContext<PaymentStateModel>, action: ClearPaymentsFromStorage) {
    ctx.setState({
      payments: null
    });
  }

  @Action(PushPayment)
  pushPayment(ctx: StateContext<PaymentStateModel>, action: PushPayment) {
    ctx.setState(patch({
      payments: append<PaymentModel>([action.payment])
    }));
  }

  @Action(SetCustomerToken)
  setCustomerToken(ctx: StateContext<PaymentStateModel>, action: SetCustomerToken) {
    return this.paymentService.setCustomerToken(action.customerId).pipe(
      tap((user: UserModel) => {
        this.store.dispatch(new UpdateUser(user));
      })
    );
  }

  @Action(FetchUserPayments)
  fetchUserPayments(ctx: StateContext<PaymentStateModel>, action: FetchUserPayments) {
    return this.paymentService.getUserPayments().pipe(
      tap((data: PaymentModel[]) => {
        ctx.setState({
          payments: data
        });
      })
    );
  }
}
