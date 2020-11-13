import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HelperService} from '../../../shared/services/helper.service';
import {OrderStatus} from '../../../commons/enums/order-status.enum';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {InvoiceActions} from '../../../state-management/invoice/invoice.actions';
import FetchUserInvoices = InvoiceActions.FetchUserInvoices;
import {OrderActions} from '../../../state-management/order/order.actions';
import FetchUserOrders = OrderActions.FetchUserOrders;
import {OrderModel} from '../../../models/Orders/order.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] =
    [
      'id',
      'status',
      'createdAt',
      'updatedAt',
      'shipmentDate',
      'actions'
    ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(public helperService: HelperService,
              private router: Router,
              public gdService: GlobalDataService,
              public store: Store) {

    if (!gdService.Invoices) {
      this.store.dispatch(new FetchUserInvoices()).subscribe(() => {
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    }
    if (!this.gdService.Orders) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchUserOrders()).subscribe(() => {
        this.refreshOrders();
        this.helperService.hideSpinner();
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    } else {
      this.refreshOrders();
    }
  }

  refreshOrders() {
    this.helperService.orderDataSource.data = this.Orders;
  }

  ngOnInit(): void {
    this.helperService.orderDataSource.paginator = this.paginator;
    this.helperService.orderDataSource.sort = this.sort;
  }

  navigateToOrder(order: OrderModel) {
    this.router.navigate(['/orders', order.id], {
      queryParams: {
        status: order.status
      }
    });
  }

  get Orders() {
    return this.gdService.Orders;
  }
}
