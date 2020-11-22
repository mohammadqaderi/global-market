import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';
import {SubCategoryTagModel} from '../../models/Categories/sub-category-tag.model';
import {ProductTagModel} from '../../models/Products/product-tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private _http: HttpClient) {
  }

  getSubCategoriesTags(): Observable<SubCategoryTagModel[]> {
    return this._http.get<SubCategoryTagModel[]>(`${ApiEndpoints.TagEndpoints.rootTags}/sub-categories`);
  }

  getProductsTags(): Observable<ProductTagModel[]> {
    return this._http.get<ProductTagModel[]>(`${ApiEndpoints.TagEndpoints.rootTags}/products`);
  }


}
