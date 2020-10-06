import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {ProductActions, ProductStateModel} from './product.actions';
import {Injectable} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {tap} from 'rxjs/operators';
import {ProductModel} from '../../models/Products/product.model';
import ClearProducts = ProductActions.ClearProducts;
import {patch} from '@ngxs/store/operators';
import FetchMostSalesProducts = ProductActions.FetchMostSalesProducts;
import FetchMonthProducts = ProductActions.FetchMonthProducts;
import FetchShopProducts = ProductActions.FetchShopProducts;
import FetchCustomProducts = ProductActions.FetchCustomProducts;
import {SubCategoryService} from '../../services/category/sub-category.service';
import FetchMixLatestProducts = ProductActions.FetchMixLatestProducts;

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    shopProducts: null,
    currentMonthProducts: null,
    mostSalesProducts: null
  }
})

@Injectable()
export class ProductState {
  constructor(private productService: ProductService,
              private subCategoryService: SubCategoryService,
              private store: Store) {
  }

  @Selector()
  static ShopProducts(state: ProductStateModel) {
    return state.shopProducts;
  }

  @Selector()
  static MonthProducts(state: ProductStateModel) {
    return state.currentMonthProducts;
  }

  @Selector()
  static MostSalesProducts(state: ProductStateModel) {
    return state.mostSalesProducts;
  }

  @Action(FetchShopProducts)
  fetchShopProducts(ctx: StateContext<ProductStateModel>, action: FetchShopProducts) {
    return this.productService.getShopProducts(action.take).pipe(
      tap((data: ProductModel[]) => {
        ctx.setState(patch({
          shopProducts: data
        }));
      })
    );
  }

  @Action(FetchMostSalesProducts)
  fetchMostSalesProducts(ctx: StateContext<ProductStateModel>, action: FetchMostSalesProducts) {
    return this.productService.getMostSalesProducts().pipe(
      tap((data: ProductModel[]) => {
        ctx.setState(patch({
          mostSalesProducts: data
        }));
      })
    );
  }

  @Action(FetchCustomProducts)
  fetchCustomProducts(ctx: StateContext<ProductStateModel>, action: FetchCustomProducts) {
    return this.productService.getCustomProducts(action.productsCustomFilterDto).pipe(
      tap((data: ProductModel[]) => {
        ctx.setState(patch({
          shopProducts: data
        }));
      })
    );
  }


  @Action(FetchMixLatestProducts)
  fetchMixLatestProducts(ctx: StateContext<ProductStateModel>, action: FetchMixLatestProducts) {
    return this.subCategoryService.getMixLatestProducts().pipe(
      tap((data: ProductModel[]) => {
        console.log(data.length);
        ctx.setState(patch({
          currentMonthProducts: data
        }));
      })
    );
  }


  @Action(ClearProducts)
  clearProducts(ctx: StateContext<ProductStateModel>, action: ClearProducts) {
    ctx.setState({
      shopProducts: null,
      mostSalesProducts: null,
      currentMonthProducts: null
    });
  }

}
