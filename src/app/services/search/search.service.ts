import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';
import {INameSearch, ISearch} from '../../commons/interfaces/search.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  searchByName(searchPayload: ISearch): Observable<any> {
    return this.http.post<any>(ApiEndpoints.Search.searchByName, searchPayload);
  }

  getItemsNames(searchPayload: INameSearch): Observable<any> {
    return this.http.post<any>(ApiEndpoints.Search.itemsNamesSearch, searchPayload);
  }

}
