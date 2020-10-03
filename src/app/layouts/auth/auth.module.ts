import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared-global.module';
import {RouterModule} from '@angular/router';
import {AuthLayoutRoutes} from './auth-layout.routing';
import {LoginComponent} from '../../pages/auth/login/login.component';
import {RegisterComponent} from '../../pages/auth/register/register.component';
import {ResetPasswordComponent} from '../../pages/auth/reset-password/reset-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    SharedModule
  ]
})
export class AuthModule {
}
