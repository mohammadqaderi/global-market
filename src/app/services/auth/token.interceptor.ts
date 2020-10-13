import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalDataService} from '../../shared/services/global-data.service';
import * as jwt from 'jsonwebtoken';
import {Store} from '@ngxs/store';
import {AuthService} from './auth.service';
import {UpdateToken} from '../../state-management/auth/auth-actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private gdService: GlobalDataService, private store: Store, private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.gdService.Token();
    if (token) {
      const decoded = jwt.decode(token, 'secretKey');
      const {exp} = decoded as any;
      if (Date.now() >= exp * 1000) {
        this.authService.updateToken(this.gdService.User.email).subscribe((data: { jwt: string }) => {
          const {jwt} = data;
          this.store.dispatch(new UpdateToken(jwt)).subscribe(() => {
            const tokenReq = request.clone({
              setHeaders: {
                Authorization: `Bearer ${jwt}`
              }
            });
            return next.handle(tokenReq);
          });
        });
      } else {
        const tokenReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(tokenReq);
      }

    }
    return next.handle(request);
  }
}
