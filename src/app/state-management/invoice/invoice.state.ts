import {Action, Selector, State, StateContext} from '@ngxs/store';
import {InvoiceActions, InvoiceStateModel} from './invoice.actions';
import {Injectable} from '@angular/core';
import {InvoiceService} from '../../services/invoice/invoice.service';
import {tap} from 'rxjs/operators';
import {InvoiceModel} from '../../models/Invoice/invoice.model';
import FetchUserInvoices = InvoiceActions.FetchUserInvoices;
import ClearInvoicesFromStorage = InvoiceActions.ClearInvoicesFromStorage;
import PushInvoice = InvoiceActions.PushInvoice;
import {append, patch} from '@ngxs/store/operators';


@State<InvoiceStateModel>({
  name: 'invoices',
  defaults: {
    invoices: null
  }
})

@Injectable()
export class InvoiceState {
  constructor(private invoiceService: InvoiceService) {
  }

  @Selector()
  static Invoices(state: InvoiceStateModel) {
    return state.invoices;
  }


  @Action(FetchUserInvoices)
  fetchUserInvoices(ctx: StateContext<InvoiceStateModel>, action: FetchUserInvoices) {
    return this.invoiceService.getUserInvoices().pipe(
      tap((data: InvoiceModel[]) => {
        ctx.setState({
          invoices: data
        });
      })
    );
  }

  @Action(PushInvoice)
  pushInvoice(ctx: StateContext<InvoiceStateModel>, action: PushInvoice) {
    ctx.setState(patch({
      invoices: append<InvoiceModel>([action.invoice])
    }));
  }

  @Action(ClearInvoicesFromStorage)
  clearInvoicesFromStorage(ctx: StateContext<InvoiceStateModel>, action: ClearInvoicesFromStorage) {
    ctx.setState({
      invoices: null
    });
  }
}
