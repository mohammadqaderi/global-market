import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {InvoiceActions} from '../../../state-management/invoice/invoice.actions';
import FetchUserInvoices = InvoiceActions.FetchUserInvoices;
import {Store} from '@ngxs/store';
import {HelperService} from '../../../shared/services/helper.service';
import {MatSort} from '@angular/material/sort';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  displayedColumns: string[] =
    [
      'id',
      'total',
      'date',
      'dueDate',
      'paymentDate'
    ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(public helperService: HelperService,
              public gdService: GlobalDataService,
              public store: Store) {
    if (!gdService.Invoices) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchUserInvoices()).subscribe(() => {
        this.refreshInvoices();
        this.helperService.hideSpinner();
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    } else {
      this.refreshInvoices();
    }
  }

  refreshInvoices() {
    this.helperService.invoicesDataSource.data = this.Invoices;
  }

  ngOnInit(): void {
    this.helperService.invoicesDataSource.paginator = this.paginator;
    this.helperService.invoicesDataSource.sort = this.sort;
  }

  get Invoices() {
    return this.gdService.Invoices;
  }


}
