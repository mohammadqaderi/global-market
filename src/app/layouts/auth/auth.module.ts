import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared-global.module';
import {RouterModule} from '@angular/router';
import {AuthLayoutRoutes} from './auth-layout.routing';
import {LoginComponent} from '../../pages/auth/login/login.component';
import {RegisterComponent} from '../../pages/auth/register/register.component';
import {ResetPasswordComponent} from '../../pages/auth/reset-password/reset-password.component';
import {PasswordStrengthMeterModule} from 'angular-password-strength-meter';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    SharedModule,
    PasswordStrengthMeterModule
  ]
})
export class AuthModule {
}
