import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router,
              private gdService: GlobalDataService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.gdService.IsAuthenticated()
      && this.gdService.User
      && !helper.isTokenExpired(this.gdService.Token())) {
      return true;
    } else {
      this.gdService.userLogout(state.url);
      return false;
    }
  }
}
