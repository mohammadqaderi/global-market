import {Action, Selector, State, StateContext} from '@ngxs/store';
import {NotificationActions, NotificationStateModel} from './notification.actions';
import {Injectable} from '@angular/core';
import {NotificationsService} from '../../services/notification/notification.service';
import FetchAllNotifications = NotificationActions.FetchAllNotifications;
import {tap} from 'rxjs/operators';
import {NotificationEntity} from '../../models/Notifications/models/notification-entity';
import {patch} from '@ngxs/store/operators';
import ClearNotifications = NotificationActions.ClearNotifications;


@State<NotificationStateModel>({
  name: 'notifications',
  defaults: {
    notifications: null,
    subscribers: null
  }
})
@Injectable()
export class NotificationState {
  constructor(private notificationService: NotificationsService) {
  }

  @Selector()
  static Notifications(state: NotificationStateModel) {
    return state.notifications;
  }

  @Selector()
  static Subscribers(state: NotificationStateModel) {
    return state.subscribers;
  }


  @Action(FetchAllNotifications)
  fetchAllNotifications(ctx: StateContext<NotificationStateModel>, action: FetchAllNotifications) {
    return this.notificationService.getAllNotifications().pipe(
      tap((notifications: NotificationEntity[]) => {
        if (notifications) {
          ctx.setState(patch({
            notifications
          }));
        }
      })
    );
  }


  @Action(ClearNotifications)
  clearNotifications(ctx: StateContext<NotificationStateModel>, action: ClearNotifications) {
    ctx.setState({
      notifications: null,
      subscribers: null
    });
  }
}
