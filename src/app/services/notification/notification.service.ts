import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';
import {NotificationPayloadDto} from '../../models/Notifications/classes/notification-payload.dto';

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
