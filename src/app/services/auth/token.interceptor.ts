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
import {UpdateToken} from '../../state-management/auth/auth-actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private gdService: GlobalDataService, private store: Store) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.gdService.Token();
    if (token) {
      const decoded = jwt.decode(token, 'secretKey');
      const {exp} = decoded as any;
      if (Date.now() >= exp * 1000) {
        const newToken = jwt.sign(this.gdService.User.email, 'secretKey');
        this.store.dispatch(new UpdateToken(newToken)).subscribe(() => {
          const tokenReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });
          return next.handle(tokenReq);
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
