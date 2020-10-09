import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesComponent} from '../../pages/invoices/invoices/invoices.component';
import {RouterModule} from '@angular/router';
import {InvoiceLayoutRoutes} from './invoice-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(InvoiceLayoutRoutes),
    SharedModule
  ]
})
export class InvoiceLayoutModule {
}
