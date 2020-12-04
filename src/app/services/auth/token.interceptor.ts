import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();
import {ApiEndpoints} from '../../commons/api-endpoints';


// tslint:disable-next-line:no-var-requires
import axios from 'axios';
import {Store} from '@ngxs/store';
import {UpdateToken} from '../../state-management/auth/auth-actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private gdService: GlobalDataService,
              private store: Store) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.gdService.Token();
    if (token && helper.isTokenExpired(token)) {
      axios.get(`${ApiEndpoints.AuthEndpoints.updateToken}/${this.gdService.User.email}`)
        .then((result) => {
          return this.store.dispatch(new UpdateToken(result.data.jwt));
        }).then(() => {
      });
    }
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.gdService.Token()}`
      }
    });
    return next.handle(tokenReq);
  }


}
