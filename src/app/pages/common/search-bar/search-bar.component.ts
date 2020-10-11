import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../models/Products/product.model';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  search: string;
  selectedOptionSearch: string = 'Categories';
  selectedList: any[] = [];
  @Input() drawer: MatSidenav;
  @Input() isHandset$: Observable<boolean>;

  constructor() {
  }

  @Input() gdService: GlobalDataService;
  @Input() router: Router;

  ngOnInit(): void {
    this.checkAutoCompleteList(this.selectedOptionSearch);
  }

  submitSearch() {
    if (this.drawer) {
      this.drawer.close();
    }
    this.router.navigate([`/search/${this.search}/`, this.selectedOptionSearch], {
      queryParams: {
        type: this.selectedOptionSearch
      }
    });
  }

  setOptionSearch(value: string) {
    this.selectedOptionSearch = value;
    this.checkAutoCompleteList(value);
  }

  checkAutoCompleteList(value: string) {
    this.selectedList = [];
    switch (value) {
      case 'Categories': {
        for (let i = 0; i < this.gdService.Categories.length; i++) {
          this.selectedList = [...this.selectedList, this.gdService.Categories[i].name];
        }
        break;
      }
      case 'Sub Categories': {
        for (let i = 0; i < this.gdService.SubCategories.length; i++) {
          this.selectedList = [...this.selectedList, this.gdService.SubCategories[i].name];
        }
        break;
      }
      case 'Products': {
        this.fillListByProducts(this.gdService.MostSalesProducts);
        if (this.selectedList.length === 0) {
          this.fillListByProducts(this.gdService.MonthProducts);
        }
        break;
      }
    }
  }

  fillListByProducts(products: ProductModel[]) {
    for (let i = 0; i < products.length; i++) {
      this.selectedList = [...this.selectedList, products[i].name];
    }
  }

}
