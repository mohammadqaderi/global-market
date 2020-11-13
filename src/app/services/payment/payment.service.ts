import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {PaymentModel} from '../../models/Payments/payment.model';
import {UserModel} from '../../models/Auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) {
  }

  setCustomerToken(customerId: string): Observable<UserModel> {
    return this._http.post<UserModel>
    (`${ApiEndpoints.PaymentEndpoints.rootPayments}/customer/set-token`, {customerId});
  }

  getUserPayments(): Observable<PaymentModel[]> {
    return this._http.get<PaymentModel[]>(`${ApiEndpoints.PaymentEndpoints.rootPayments}/user`);
  }

}
