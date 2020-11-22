import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import { Observable} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {ProductService} from '../../../services/product/product.service';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {CategoryService} from '../../../services/category/category.service';

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

  @ViewChild('searchField', {static: true}) searchField: ElementRef;
  @ViewChild('matAutocomplete', {static: true}) matAutocomplete: MatAutocomplete;

  @Input() gdService: GlobalDataService;
  @Input() router: Router;

  ngOnInit(): void {
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
  }

}
