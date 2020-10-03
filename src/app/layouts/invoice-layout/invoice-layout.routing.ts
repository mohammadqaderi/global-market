import {Routes} from '@angular/router';
import {InvoicesComponent} from '../../pages/invoices/invoices/invoices.component';
import {InvoiceDetailsComponent} from '../../pages/invoices/invoice-details/invoice-details.component';

export const InvoiceLayoutRoutes: Routes = [
  {
    path: 'invoices',
    component: InvoicesComponent,
  },
  {
    path: 'invoices/:id',
    component: InvoiceDetailsComponent
  }
];
