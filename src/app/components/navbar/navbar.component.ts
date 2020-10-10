import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {MatSidenav} from '@angular/material/sidenav';
import {HelperService} from '../../shared/services/helper.service';
import {ProductModel} from '../../models/Products/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search: string;
  selectedOptionSearch: string = 'Categories';
  selectedList: any[] = [];
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  @ViewChild('enableCookies', {static: false}) enableCookies: TemplateRef<any>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public helperService: HelperService,
    public gdService: GlobalDataService) {
  }


  ngOnInit(): void {
    this.checkAutoCompleteList(this.selectedOptionSearch);
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

  submitSearch() {
    this.router.navigate([`/search/${this.search}/`, this.selectedOptionSearch], {
      queryParams: {
        type: this.selectedOptionSearch
      }
    });
  }

  fillListByProducts(products: ProductModel[]) {
    for (let i = 0; i < products.length; i++) {
      this.selectedList = [...this.selectedList, products[i].name];
    }
  }

}
