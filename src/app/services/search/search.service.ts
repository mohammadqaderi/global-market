import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  searchByName(name: string, type: string, take: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('take', take.toString());
    return this.http.get<any>(`${ApiEndpoints.Search.searchByName}/${name}/${type}`, {
      params
    });
  }

}
