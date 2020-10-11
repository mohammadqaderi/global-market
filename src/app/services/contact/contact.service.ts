import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContactMessageDto} from '../../commons/public-dto/contact-message.dto';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private _http: HttpClient) {
  }

  sendContactMessage(data: ContactMessageDto): Observable<void> {
    return this._http.post<void>(ApiEndpoints.Contact.messageUri, data);
  }

}
