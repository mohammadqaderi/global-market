import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {ProductActions} from '../../../state-management/product/product.actions';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import FetchShopProducts = ProductActions.FetchShopProducts;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  rangeFormField = {
    range1: null,
    range2: null
  };
  dateForm = {
    date: null
  };
  startDate = new Date(2016, 11, 1);

  constructor(public helperService: HelperService,
              public store: Store,
              public gdService: GlobalDataService) {
  }

  setRange1(value: number) {
    this.rangeFormField.range1 = value;
  }

  setRange2(value: number) {
    this.rangeFormField.range2 = value;
  }

  ngOnInit(): void {
    if (!this.gdService.ShopProducts) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchShopProducts(20)).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
    if (!this.gdService.SubCategories) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchAllSubCategories()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }

  }

}
