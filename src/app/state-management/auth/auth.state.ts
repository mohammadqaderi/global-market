import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {AuthStateModel, Login, Logout, Register, SetUserCart, SetUserProfile, UpdateToken} from './auth-actions';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';
import {LoginResponse} from '../../commons/interfaces/login-response';
import {UserModel} from '../../models/Auth/user.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: null,
  }
})

@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static Token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static Username(state: AuthStateModel): string | null {
    return state.user.username;
  }

  @Selector()
  static User(state: AuthStateModel): UserModel | null {
    return state.user;
  }

  constructor(private authService: AuthService, private store: Store) {
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: LoginResponse) => {
        if (result) {
          ctx.setState({
            user: result.user,
            token: result.token
          });
        }
      })
    );
  }

  @Action(Register)
  registerAdmin(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload).pipe(
      tap((result: LoginResponse) => {
        if (result) {
          ctx.setState({
            user: result.user,
            token: result.token
          });
        }
      })
    );
  }

  @Action(SetUserProfile)
  setUserProfile(ctx: StateContext<AuthStateModel>, action: SetUserProfile) {
    const user = Object.assign({}, ctx.getState().user);
    user.profileId = action.profileId;
    ctx.patchState({
      user
    });
  }

  @Action(SetUserCart)
  setUserCart(ctx: StateContext<AuthStateModel>, action: SetUserCart) {
    const user = Object.assign({}, ctx.getState().user);
    user.cartId = action.cartId;
    ctx.patchState({
      user
    });
  }

  @Action(UpdateToken)
  updateToken(ctx: StateContext<AuthStateModel>, action: UpdateToken) {
    ctx.patchState({
      token: action.token
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, action: Logout) {
    ctx.setState({
      token: null,
      user: null,
    });
  }
}
