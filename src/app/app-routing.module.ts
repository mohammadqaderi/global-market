import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './layouts/dashboard/dashboard.component';
import {ErrorComponent} from './layouts/error/error.component';
import {SubCategoryLayoutComponent} from './layouts/sub-category-layout/sub-category-layout.component';
import {OrderLayoutComponent} from './layouts/order-layout/order-layout.component';
import {UserAuthGuard} from './commons/guards/user-auth.guard';
import {ProductLayoutComponent} from './layouts/product-layout/product-layout.component';
import {InvoiceLayoutComponent} from './layouts/invoice-layout/invoice-layout.component';
import {TagLayoutComponent} from './layouts/tag-layout/tag-layout.component';
import {ShopLayoutComponent} from './layouts/shop-layout/shop-layout.component';
import {CartLayoutComponent} from './layouts/cart-layout/cart-layout.component';
import {CommonLayoutRoutes} from './layouts/common-layout/common-layout.routing';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';
import {CategoryLayoutComponent} from './layouts/category-layout/category-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/dashboard/dashboard.module').then(d => d.DashboardModule)
      }
    ]
  },
  {
    path: '',
    component: InvoiceLayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/invoice-layout/invoice-layout.module').then(i => i.InvoiceLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: ProductLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/product-layout/product-layout.module').then(p => p.ProductLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: SubCategoryLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/sub-category-layout/sub-category-layout.module').then(subC => subC.SubCategoryLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: CartLayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/cart-layout/cart-layout.module').then(c => c.CartLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: OrderLayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/order-layout/order-layout.module').then(o => o.OrderLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/common-layout/common-layout.module').then(c => c.CommonLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/shop-layout/shop-layout.module').then(s => s.ShopLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: CategoryLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/category-layout/category-layout.module').then(c => c.CategoryLayoutModule)
      }
    ]
  },

  {
    path: '',
    component: TagLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/tag-layout/tag-layout.module').then(t => t.TagLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: ErrorComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/error/error.module').then(e => e.ErrorModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./layouts/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
