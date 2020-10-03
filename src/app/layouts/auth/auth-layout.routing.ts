import {Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from '../../pages/auth/login/login.component';
import {RegisterComponent} from '../../pages/auth/register/register.component';
import {ResetPasswordComponent} from '../../pages/auth/reset-password/reset-password.component';

export const AuthLayoutRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {
        path: 'reset-password/:newPasswordToken',
        component: ResetPasswordComponent,
      }
    ]
  }

];
