import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {CategoryModel} from '../../../models/Categories/category.model';
import {CategoryService} from '../../../services/category/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category: CategoryModel;

  constructor(private router: Router,
              public helperService: HelperService,
              public gdService: GlobalDataService,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      if (id) {
        helperService.showSpinner();
        const category = this.gdService.Categories.find(c => c.id === id);
        console.log(category);
        if (category) {
          this.category = category;
          helperService.hideSpinner();
        } else {
          this.categoryService.getCategoryById(id).subscribe(response => {
            this.category = response;
            helperService.hideSpinner();
          });
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
