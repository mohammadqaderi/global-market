import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {ProductService} from '../../../services/product/product.service';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {CategoryService} from '../../../services/category/category.service';
import {FormControl} from '@angular/forms';
import {debounceTime, delay, filter, map, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {SearchService} from '../../../services/search/search.service';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  search: string;
  selectedOptionSearch: string = 'Categories';
  selectedList: any[] = [];
  @Input() drawer: MatSidenav;
  @Input() isHandset$: Observable<boolean>;
  public itemsFilteringCtrl: FormControl = new FormControl();
  public items: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public matSelectCtrl: FormControl = new FormControl();

  protected _onDestroy = new Subject<void>();

  /** indicate search operation is in progress */
  public searching = false;

  constructor(private searchService: SearchService) {
  }

  @ViewChild('matAutocomplete', {static: true}) matAutocomplete: MatAutocomplete;

  @Input() gdService: GlobalDataService;
  @Input() router: Router;

  ngOnInit(): void {
    this.itemsFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((search: string) => {
          if (!search) {
            this.items.next([]);
          }
          if (!this.selectedList) {
            return [];
          }
          return search;
        }),

        mergeMap(search => this.searchService.getItemsNames({name: search.toString(), type: this.selectedOptionSearch})),
        delay(500),
        takeUntil(this._onDestroy),
      )
      .subscribe(items => {
          this.searching = false;
          this.items.next(items);
        },
        error => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        });
  }

  submitSearch(searchValue: string) {
    if (this.drawer) {
      this.drawer.close();
    }
    this.router.navigate([`/search/${searchValue}/`, this.selectedOptionSearch], {
      queryParams: {
        type: this.selectedOptionSearch
      }
    });
  }

  setOptionSearch(value: string) {
    this.selectedOptionSearch = value;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
