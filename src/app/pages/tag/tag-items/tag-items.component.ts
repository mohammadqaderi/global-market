import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {ProductModel} from '../../../models/Products/product.model';
import {ProductService} from '../../../services/product/product.service';

@Component({
  selector: 'app-tag-items',
  templateUrl: './tag-items.component.html',
  styleUrls: ['./tag-items.component.css']
})
export class TagItemsComponent implements OnInit {

  products: ProductModel[];
  searchedTag: string;

  constructor(public store: Store, private router: Router,
              private route: ActivatedRoute,
              public gdService: GlobalDataService,
              private productService: ProductService,
              public helperService: HelperService) {
    helperService.showSpinner();
    route.paramMap.subscribe((params: ParamMap) => {
      const tagName = params.get('name');
      if (tagName) {
        this.searchedTag = tagName;
        this.productService.searchByMatchingName(tagName)
          .subscribe((productsRes: ProductModel[]) => {
            this.products = productsRes;
            helperService.hideSpinner();
          });
      }
    });
  }


  ngOnInit(): void {
  }

}
