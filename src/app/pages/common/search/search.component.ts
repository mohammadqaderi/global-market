import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SearchService} from '../../../services/search/search.service';
import {CategoryModel} from '../../../models/Categories/category.model';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductModel} from '../../../models/Products/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categoriesArray: CategoryModel[];
  subCategoriesArray: SubCategoryModel[];
  productsArray: ProductModel[];
  take: number = 10;
  name: string;
  type: string;
  showSpinner = false;

  constructor(private router: Router,
              public helperService: HelperService,
              public gdService: GlobalDataService,
              private route: ActivatedRoute,
              private searchService: SearchService) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.productsArray = null;
      this.categoriesArray = null;
      this.subCategoriesArray = null;
      const name = params.get('name');
      const type = params.get('type');
      if (name && type) {
        this.name = name;
        this.type = type;
        this.setData(name, type);
      } else {
        helperService.hideSpinner();
        router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {
  }

  setData(name: string, type: string) {
    this.helperService.showSpinner();
    this.searchService.searchByName(name, type, this.take).subscribe((data) => {
        switch (type) {
          case 'Categories': {
            this.categoriesArray = data;
            break;
          }
          case 'Sub Categories': {
            this.subCategoriesArray = data;
            break;
          }
          case 'Products': {
            this.productsArray = data;
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


  backToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  loadMore() {
    if (this.categoriesArray) {
      this.take = this.categoriesArray.length + 5;
      this.loadMoreSearch();
    } else if (this.subCategoriesArray) {
      this.take = this.subCategoriesArray.length + 5;
      this.loadMoreSearch();
    } else if (this.productsArray) {
      this.take = this.productsArray.length + 5;
      this.loadMoreSearch();
    }
  }

  loadMoreSearch() {
    this.showSpinner = true;
    this.searchService.searchByName(this.name, this.type, this.take).subscribe((data) => {
        switch (this.type) {
          case 'Categories': {
            this.categoriesArray = data;
            break;
          }
          case 'Sub Categories': {
            this.subCategoriesArray = data;
            break;
          }
          case 'Products': {
            this.productsArray = data;
            break;
          }
        }
        this.showSpinner = false;
      }
    );
  }

  showLoadMore() {
    return (this.categoriesArray && this.categoriesArray.length > 0)
      || (this.subCategoriesArray && this.subCategoriesArray.length > 0)
      || (this.productsArray && this.productsArray.length > 0);
  }
}
