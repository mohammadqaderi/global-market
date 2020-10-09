import {Component, OnInit} from '@angular/core';
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

  constructor(private gdService: GlobalDataService, private route: ActivatedRoute,
              private orderService: OrderService,
              public helperService: HelperService) {
    this.helperService.showSpinner();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      if (id) {
        this.orderService.getOrderDetails(id).subscribe((data) => {
          console.log(data);
          this.order = data.order;
          this.orderItemsProducts = data.orderItemsProducts;
          this.helperService.hideSpinner();
        });
      }
    });
  }

  order: OrderModel;
  orderItemsProducts: ProductModel[];

  ngOnInit(): void {

  }

}
