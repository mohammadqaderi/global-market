import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from '../../state-management/auth/auth.state';
import {GlobalDataService} from '../../shared/services/global-data.service';


@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router,
              private gdService: GlobalDataService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.store.selectSnapshot(AuthState.isAuthenticated)
      && this.store.selectSnapshot(AuthState.User)) {
      return true;
    } else {
      this.gdService.userLogout();
      return false;
    }
  }
}
