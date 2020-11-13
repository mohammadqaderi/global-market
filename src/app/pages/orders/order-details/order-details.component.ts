import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {OrderModel} from '../../../models/Orders/order.model';
import {ProductModel} from '../../../models/Products/product.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private gdService: GlobalDataService, private route: ActivatedRoute,
              private orderService: OrderService,
              public helperService: HelperService) {
    this.helperService.showSpinner();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      if (id) {
        this.orderService.getOrderDetails(id).subscribe((data) => {
          this.order = data.order;
          this.orderItemsProducts = data.orderItemsProducts;
          this.helperService.hideSpinner();
        }, error => {
          this.helperService.showErrorDialog(error, this.errorTemplate);
        });
      }
    });
  }

  order: OrderModel;
  orderItemsProducts: ProductModel[];

  ngOnInit(): void {

  }

}
