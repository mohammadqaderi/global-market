import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {ProductActions} from '../../../state-management/product/product.actions';
import FetchMostSalesProducts = ProductActions.FetchMostSalesProducts;
import FetchMonthProducts = ProductActions.FetchMonthProducts;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public gdService: GlobalDataService, public helperService: HelperService,
              private store: Store) {
  }

  ngOnInit(): void {
    if (!this.gdService.MostSalesProducts) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchMostSalesProducts()).subscribe(() => {
      });
    }
    if (!this.gdService.MonthProducts) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchMonthProducts()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
  }

}
