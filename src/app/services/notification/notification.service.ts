import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  addPushSubscriber(sub: any, email: string) {
    return this.http.post(ApiEndpoints.NotificationEndpoints.newSubscriber, {
      subscriptionDto: {
        sub,
        email
      }
    });
  }

}
