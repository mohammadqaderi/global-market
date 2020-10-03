import {NgModule} from '@angular/core';
import {
  MDBBootstrapModule,
  BadgeModule,
  BreadcrumbModule,
  MDBRootModule,
  ModalModule,
  ButtonsModule,
  WavesModule,
  TooltipModule,
  TableModule,
  PopoverModule,
  NavbarModule,
  CardsModule,
  DropdownModule,
  IconsModule,
  CheckboxModule,
  InputUtilitiesModule,
  CarouselModule,
  CollapseModule,
  ChartsModule,
  StickyHeaderModule,
  InputsModule
} from 'angular-bootstrap-md';

export const mdbModules = [
  MDBBootstrapModule.forRoot(),
  BadgeModule,
  BreadcrumbModule,
  MDBRootModule,
  ModalModule.forRoot(),
  ButtonsModule.forRoot(),
  WavesModule.forRoot(),
  TooltipModule.forRoot(),
  TableModule,
  PopoverModule.forRoot(),
  NavbarModule,
  CardsModule.forRoot(),
  DropdownModule.forRoot(),
  IconsModule,
  CheckboxModule,
  InputUtilitiesModule,
  CarouselModule.forRoot(),
  CollapseModule.forRoot(),
  ChartsModule,
  StickyHeaderModule,
  InputsModule.forRoot(),
];

@NgModule({
  imports: mdbModules,
  exports: [mdbModules]
})
export class MdbModule {

}
