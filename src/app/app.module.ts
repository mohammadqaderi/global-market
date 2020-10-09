import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared-global.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorComponent} from './layouts/error/error.component';
import {AuthComponent} from './layouts/auth/auth.component';
import {ComponentModule} from './components/component.module';
import {DashboardComponent} from './layouts/dashboard/dashboard.component';
import {NgxsModule} from '@ngxs/store';
import {States, StatesNames} from './state-management/states';
import {environment} from '../environments/environment';
import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';
import {SubCategoryLayoutComponent} from './layouts/sub-category-layout/sub-category-layout.component';
import {ShopLayoutComponent} from './layouts/shop-layout/shop-layout.component';
import {CartLayoutComponent} from './layouts/cart-layout/cart-layout.component';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';
import {InvoiceLayoutComponent} from './layouts/invoice-layout/invoice-layout.component';
import {OrderLayoutComponent} from './layouts/order-layout/order-layout.component';
import {PaymentLayoutComponent} from './layouts/payment-layout/payment-layout.component';
import {ProductLayoutComponent} from './layouts/product-layout/product-layout.component';
import {TokenInterceptor} from './services/auth/token.interceptor';
import {ErrorInterceptor} from './services/auth/error.interceptor';
import {TagLayoutComponent} from './layouts/tag-layout/tag-layout.component';
import {CookieService} from 'ngx-cookie-service';
import {BrowserModule} from '@angular/platform-browser';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {StripeIntegrationModule} from './modules/stripe-integration/stripe-integration.module';
import {NgxStripeModule} from 'ngx-stripe';
import {AsyncPipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    DashboardComponent,
    SubCategoryLayoutComponent,
    CartLayoutComponent,
    CommonLayoutComponent,
    InvoiceLayoutComponent,
    OrderLayoutComponent,
    PaymentLayoutComponent,
    ProductLayoutComponent,
    ShopLayoutComponent,
    TagLayoutComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentModule,
    NgxsModule.forRoot(States, {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: StatesNames,
      storage: StorageOption.LocalStorage
    }),
    BrowserAnimationsModule,
    StripeIntegrationModule,
    SharedModule,
    NgxStripeModule.forRoot('pk_test_NGZldNb6iALz1pXcygYAYYZv000hYAH7Lb'),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AsyncPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
