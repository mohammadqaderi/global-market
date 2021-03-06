import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared-global.module';
import {PipesModule} from '../commons/pipes/pipes.module';
import {CommonLayoutModule} from '../layouts/common-layout/common-layout.module';


@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PipesModule,
    CommonLayoutModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class ComponentModule {
}
