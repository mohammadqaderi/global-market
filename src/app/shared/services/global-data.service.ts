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


  get LatestProducts() {
    return this.store.selectSnapshot(ProductState.LatestProducts);
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
    this.router.navigate([`/sub-categories/${subCategory.categoryId}`, subCategory.id], {
      queryParams: {
        subCategory: subCategory.name
      }
    });
  }


  userLogout(url: string) {
    this.store.dispatch([
      new Logout(),
      new ClearProfileData(),
      new ClearCartFromStorage(),
      new ClearInvoicesFromStorage(),
      new ClearOrdersFromStorage(),
      new ClearPaymentsFromStorage()]).subscribe(() => {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          returnUrl: url || 'home'
        }
      });
    });
  }

  // pagination data
  lastPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPage: number;
  previousPage: number;
  currentPage: number;

  setPaginationData(obj: any) {
    this.nextPage = obj.nextPage;
    this.currentPage = obj.currentPage;
    this.hasPreviousPage = obj.hasPreviousPage;
    this.lastPage = obj.lastPage;
    this.previousPage = obj.previousPage;
    this.hasNextPage = obj.hasNextPage;
  }
}
