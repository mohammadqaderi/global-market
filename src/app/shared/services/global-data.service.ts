import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState} from '../../state-management/auth/auth.state';
import {ProfileModel} from '../../models/Profile/profile.model';
import {ProfileState} from '../../state-management/profile/profile.state';
import {CategoryState} from '../../state-management/category/category.state';
import {SubCategoryState} from '../../state-management/sub-category/sub-category.state';
import {ProductState} from '../../state-management/product/product.state';
import {TagState} from '../../state-management/tag/tag.state';
import {InvoiceState} from '../../state-management/invoice/invoice.state';
import {PaymentState} from '../../state-management/payment/payment.state';
import {OrderState} from '../../state-management/order/order.state';
import {Logout} from '../../state-management/auth/auth-actions';
import {ProfileActions} from '../../state-management/profile/profile.actions';
import {InvoiceActions} from '../../state-management/invoice/invoice.actions';
import {OrderActions} from '../../state-management/order/order.actions';
import {PaymentActions} from '../../state-management/payment/payment.actions';
import ClearProfileData = ProfileActions.ClearProfileData;
import ClearInvoicesFromStorage = InvoiceActions.ClearInvoicesFromStorage;
import ClearOrdersFromStorage = OrderActions.ClearOrdersFromStorage;
import ClearPaymentsFromStorage = PaymentActions.ClearPaymentsFromStorage;
import {Router} from '@angular/router';
import {CategoryActions} from '../../state-management/category/category.actions';
import ClearCategory = CategoryActions.ClearCategory;
import {ProductActions} from '../../state-management/product/product.actions';
import ClearProducts = ProductActions.ClearProducts;
import {SubCategoryActions} from '../../state-management/sub-category/sub-category.actions';
import ClearSubCategory = SubCategoryActions.ClearSubCategory;
import {TagActions} from '../../state-management/tag/tag.actions';
import ClearTags = TagActions.ClearTags;
import {CartState} from '../../state-management/cart/cart.state';
import {CartActions} from '../../state-management/cart/cart.actions';
import ClearCartFromStorage = CartActions.ClearCartFromStorage;
import {SubCategoryModel} from '../../models/Categories/sub-category.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  constructor(private store: Store, private router: Router) {
  }


  get User() {
    return this.store.selectSnapshot(AuthState.User);
  }

  get Username() {
    return this.store.selectSnapshot(AuthState.Username);
  }

  get Cart() {
    return this.store.selectSnapshot(CartState.Cart);
  }

  get TotalPurchase() {
    let total = 0;
    for (let i = 0; i < this.Cart.cartProducts.length; i++) {
      total += this.Cart.cartProducts[i].totalPrice;
    }
    return total;
  }

  get Categories() {
    return this.store.selectSnapshot(CategoryState.Categories);
  }

  get SubCategories() {
    return this.store.selectSnapshot(SubCategoryState.SubCategories);
  }

  get ShopProducts() {
    return this.store.selectSnapshot(ProductState.ShopProducts);
  }


  get MonthProducts() {
    return this.store.selectSnapshot(ProductState.MonthProducts);
  }

  get MostSalesProducts() {
    return this.store.selectSnapshot(ProductState.MostSalesProducts);
  }

  get SubCategoriesTags() {
    return this.store.selectSnapshot(TagState.SubCategoriesTags);
  }

  get ProductsTags() {
    return this.store.selectSnapshot(TagState.ProductsTags);
  }

  get Invoices() {
    return this.store.selectSnapshot(InvoiceState.Invoices);
  }

  get Payments() {
    return this.store.selectSnapshot(PaymentState.Payments);
  }

  get Orders() {
    return this.store.selectSnapshot(OrderState.Orders);
  }

  get Profile(): ProfileModel | null {
    return this.store.selectSnapshot(ProfileState.Profile) ? this.store.selectSnapshot(ProfileState.Profile) : null;
  }

  IsAuthenticated() {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  Token() {
    return this.store.selectSnapshot(AuthState.Token);
  }


  getInvoiceNumber(id) {
    if (this.Invoices) {
      const invoice = this.Invoices.find(i => i.id === id);
      return invoice ? invoice.number : 'No Number';
    }
  }

  navigateToSubCategory(subCategory: SubCategoryModel) {
    const category = this.Categories.find(c => c.id === subCategory.categoryId);
    this.router.navigate([`/sub-categories/${category.id}`, subCategory.id], {
      queryParams: {
        Department: category.name,
        subCategory: subCategory.name
      }
    });
  }


  clearAllData() {
    return this.store.dispatch([
      new Logout(),
      new ClearProfileData(),
      new ClearInvoicesFromStorage(),
      new ClearOrdersFromStorage(),
      new ClearPaymentsFromStorage(),
      new ClearCategory(),
      new ClearProducts(),
      new ClearSubCategory(),
      new ClearTags()]);
  }

  userLogout() {
    return this.store.dispatch([
      new Logout(),
      new ClearProfileData(),
      new ClearCartFromStorage(),
      new ClearInvoicesFromStorage(),
      new ClearOrdersFromStorage(),
      new ClearPaymentsFromStorage()]).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
