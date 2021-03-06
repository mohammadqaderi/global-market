import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ngx-custom-validators';
import {NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {InvalidCredentialsComponent} from './components/invalid-credentials/invalid-credentials.component';
import {ShowErrorDialogComponent} from './components/show-error-dialog/show-error-dialog.component';
import {MaterialModule} from './modules/material.module';
import {NgxModule} from './modules/ngx.module';
import {FileModule} from './modules/file.module';
import {AddContactsComponent} from './components/add-contacts/add-contacts.component';
import {MdbModule} from './modules/mdb.module';
import {LoginFirstComponent} from './components/login-first/login-first.component';
import {AddToCartComponent} from './components/products/add-to-cart/add-to-cart.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {PaginationComponent} from './components/pagination/pagination.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    InvalidCredentialsComponent,
    ShowErrorDialogComponent,
    AddContactsComponent,
    LoginFirstComponent,
    AddToCartComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FileModule,
    NgxModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CustomFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    MdbModule,
    FlexLayoutModule,
    RxReactiveFormsModule.forRoot()
  ],
  exports: [
    MaterialModule,
    NgbModule,
    FileModule,
    ReactiveFormsModule,
    FormsModule,
    NgxModule,
    InvalidCredentialsComponent,
    ShowErrorDialogComponent,
    AddToCartComponent,
    CustomFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FlexLayoutModule,
    AddContactsComponent,
    MdbModule,
    RxReactiveFormsModule,
    PaginationComponent,
  ]
})
export class SharedModule {
}
