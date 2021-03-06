import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginResponse} from '../../commons/interfaces/login-response';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {UserModel} from '../../models/Auth/user.model';
import {AuthCredentialsDto} from '../../commons/public-dto/auth-credentials.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {
  }

  public login(authCredentialsDto: AuthCredentialsDto): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(ApiEndpoints.AuthEndpoints.loginUser, authCredentialsDto);
  }

  public register(authCredentialsDto: AuthCredentialsDto): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(ApiEndpoints.AuthEndpoints.registerUser, authCredentialsDto);
  }


  checkUserName(username: string): Observable<boolean> {
    return this._http.get<boolean>(`${ApiEndpoints.AuthEndpoints.checkUsername}/${username}`);
  }

  sendEmailVerification(email: string) {
    const url = `${ApiEndpoints.AuthEndpoints.sendEmailVerification}/${email}`;
    return this._http.get(url);
  }

  updateToken(email: string): Observable<any> {
    return this._http.put<any>(`${ApiEndpoints.AuthEndpoints.updateToken}/${email}`, null);
  }

  verifyEmail(token: string): Observable<{ isFullyVerified: boolean, user: UserModel }> {
    const url = `${ApiEndpoints.AuthEndpoints.verifyEmail}/${token}`;
    return this._http.get<{ isFullyVerified: boolean, user: UserModel }>(url);
  }


  forgotPassword(email: string) {
    const url = `${ApiEndpoints.AuthEndpoints.forgotPassword}/${email}`;
    return this._http.get(url);
  }

  resetPassword(resetPasswordDto: any) {
    return this._http.post(ApiEndpoints.AuthEndpoints.resetPassword,
      resetPasswordDto);
  }
}
