import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {GlobalDataService} from '../../shared/services/global-data.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private gdService: GlobalDataService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.gdService.Token()}`
      }
    });
    return next.handle(tokenReq);
  }
}
