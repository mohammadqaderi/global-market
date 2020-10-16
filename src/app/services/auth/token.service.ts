import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UpdateToken} from '../../state-management/auth/auth-actions';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient, private gdService: GlobalDataService, private store: Store,
              private authService: AuthService) {
  }

  updateToken() {
    this.authService.updateToken(this.gdService.User.email).subscribe((data: { jwt: string }) => {
      const {jwt} = data;
      this.store.dispatch(new UpdateToken(jwt)).subscribe(() => {
      });
    });
  }

}
