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
import {TokenService} from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private gdService: GlobalDataService,
              private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.gdService.Token();
    let tokenReq = null;
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded) {
        const {exp} = decoded as any;
        if (exp) {
          if (Date.now() >= exp * 1000) {
            this.tokenService.updateToken();
            tokenReq = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next.handle(tokenReq);
          } else {
            tokenReq = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next.handle(tokenReq);
          }
        }
      }
    }
    return next.handle(request);
  }
}
