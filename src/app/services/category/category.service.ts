import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../models/Categories/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this._http.get<CategoryModel[]>(ApiEndpoints.CategoryEndpoints.rootCategories);
  }


  searchByMatchingName(searchValue: string): Observable<CategoryModel[]> {
    return this._http.get<CategoryModel[]>
    (`${ApiEndpoints.CategoryEndpoints.rootCategories}/match-by-name/${searchValue}`);
  }

}
