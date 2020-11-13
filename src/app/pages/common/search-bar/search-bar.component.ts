import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from '../../../models/Products/product.model';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {fromEvent, Observable} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {ProductService} from '../../../services/product/product.service';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {CategoryService} from '../../../services/category/category.service';
import {CategoryModel} from '../../../models/Categories/category.model';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';

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

  constructor(private productsService: ProductService, private subCategoryService: SubCategoryService,
              private categoryService: CategoryService) {
  }

  @ViewChild('searchField', {static: true}) searchField: ElementRef;
  @ViewChild('matAutocomplete', {static: true}) matAutocomplete: MatAutocomplete;

  @Input() gdService: GlobalDataService;
  @Input() router: Router;

  ngOnInit(): void {
    fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(200)
        , distinctUntilChanged()
      ).subscribe((value: string) => {
      if (value && value.length > 0) {
        this.setAutoCompleteList(value);
      }
    });
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
    if (this.search && this.search.length > 0) {
      this.setAutoCompleteList(this.search);
    }
  }

  setAutoCompleteList(value?: string) {
    this.selectedList = [];
    switch (this.selectedOptionSearch) {
      case 'Categories': {
        this.categoryService.searchByMatchingName(value).subscribe((data: CategoryModel[]) => {
          for (let i = 0; i < data.length; i++) {
            this.selectedList.push(data[i].name);
          }
        });
        break;
      }
      case 'Sub Categories': {
        this.subCategoryService.searchByMatchingName(value).subscribe((data: SubCategoryModel[]) => {
          for (let i = 0; i < data.length; i++) {
            this.selectedList.push(data[i].name);
          }
        });
        break;
      }
      case 'Products': {
        this.productsService.searchByMatchingName(value).subscribe((data: ProductModel[]) => {
          for (let i = 0; i < data.length; i++) {
            this.selectedList.push(data[i].name);
          }
        });
        break;
      }
    }
  }
}
