import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceModel} from '../../models/Invoice/invoice.model';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http: HttpClient) {
  }


  getUserInvoices(): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${ApiEndpoints.InvoiceEndpoints.rootInvoices}/user`);
  }

}
