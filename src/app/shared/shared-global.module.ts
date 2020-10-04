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

@NgModule({
  declarations: [InvalidCredentialsComponent, ShowErrorDialogComponent, AddContactsComponent, LoginFirstComponent,
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
    MdbModule
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
    CustomFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    AddContactsComponent,
    MdbModule
  ]
})
export class SharedModule {
}
