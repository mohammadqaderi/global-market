import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SearchService} from '../../../services/search/search.service';
import {CategoryModel} from '../../../models/Categories/category.model';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categoriesArray: CategoryModel[];
  subCategoriesArray: SubCategoryModel[];
  products: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(null);
  take: number = 10;
  name: string;
  lastPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPage: number;
  previousPage: number;
  currentPage: number;
  type: string;
  showSpinner = false;

  constructor(private router: Router,
              public helperService: HelperService,
              public gdService: GlobalDataService,
              private route: ActivatedRoute,
              private searchService: SearchService) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.categoriesArray = null;
      this.subCategoriesArray = null;
      const name = params.get('name');
      const type = params.get('type');
      if (name && type) {
        this.name = name;
        this.type = type;
        if (type === 'Products') {
          this.loadProductsResult(1);
        } else {
          this.setData(name, type);
        }
      } else {
        this.products.next(null);
        helperService.hideSpinner();
        router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {
  }

  onPageChange(page: any) {
    this.loadProductsResult(page);
  }

  setData(name: string, type: string) {
    this.helperService.showSpinner();
    this.searchService.searchByName({
      name, type, take: this.take
    }).subscribe((data) => {
        switch (type) {
          case 'Categories': {
            this.categoriesArray = data;
            break;
          }
          case 'Sub Categories': {
            this.subCategoriesArray = data;
            break;
          }
        }
        this.helperService.hideSpinner();
      }
    );
  }

  navigateToCategoryDetails(category: CategoryModel) {
    this.router.navigate(['/categories', category.id], {
      queryParams: {
        name: category.name
      }
    });
  }

  loadProductsResult(page: number) {
    this.helperService.showSpinner();
    this.searchService.searchByName({
      name: this.name, type: this.type, page, limit: 8
    }).subscribe((result) => {
      this.products.next(result.products);
      this.gdService.setPaginationData(result);
      this.helperService.hideSpinner();
    });
  }


  loadMore() {
    if (this.categoriesArray) {
      this.take = this.categoriesArray.length + 5;
      this.loadMoreSearch();
    } else if (this.subCategoriesArray) {
      this.take = this.subCategoriesArray.length + 5;
      this.loadMoreSearch();
    }
  }

  loadMoreSearch() {
    this.showSpinner = true;
    this.searchService.searchByName({
      name: this.name, type: this.type, take: this.take
    }).subscribe((data) => {
        switch (this.type) {
          case 'Categories': {
            this.categoriesArray = data;
            break;
          }
          case 'Sub Categories': {
            this.subCategoriesArray = data;
            break;
          }
        }
        this.showSpinner = false;
      }
    );
  }

  showLoadMore() {
    return (this.categoriesArray && this.categoriesArray.length > 0)
      || (this.subCategoriesArray && this.subCategoriesArray.length > 0);
  }

}
