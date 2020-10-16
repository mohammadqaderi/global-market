import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalDataService} from './shared/services/global-data.service';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {HelperService} from './shared/services/helper.service';
import {Logout, UpdateToken} from './state-management/auth/auth-actions';
import {fromEvent} from 'rxjs';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import * as jwt from 'jsonwebtoken';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public gdService: GlobalDataService,
              private cookieService: CookieService,
              private store: Store,
              private authService: AuthService,
              private router: Router, private actions: Actions, public helperService: HelperService) {
  }

  ngOnInit(): void {

    this.checkOnlineStatus();
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  checkOnlineStatus = () => {
    this.helperService.onlineEvent = fromEvent(window, 'online');
    this.helperService.offlineEvent = fromEvent(window, 'offline');
    this.helperService.subscriptions.push(this.helperService.onlineEvent.subscribe(() => {
      this.helperService.setIsOnline(true);
    }));
    this.helperService.subscriptions.push(this.helperService.offlineEvent.subscribe(() => {
      this.helperService.setIsOnline(false);
      this.router.navigate(['/no-internet'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
    }));
    let onlineStatus = false;
    let isOnline = sessionStorage.getItem('isOnline');
    if (isOnline) {
      if (isOnline === 'true') {
        onlineStatus = true;
        this.helperService.setIsOnline(onlineStatus);
      } else {
        onlineStatus = false;
        this.helperService.setIsOnline(onlineStatus);
        this.router.navigate(['/no-internet'], {
          queryParams: {
            returnUrl: this.router.url
          }
        });
      }
    }

  };


}
