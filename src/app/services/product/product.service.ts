import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductModel} from '../../models/Products/product.model';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {ProductsCustomFilterDto} from '../../commons/public-dto/products-custom-filter.dto';
import {CartModel} from '../../models/Cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) {
  }

  getShopProducts(take: number): Observable<ProductModel[]> {
    let params = new HttpParams();
    params = params.append('take', take.toString());
    return this._http.get<ProductModel[]>(`${ApiEndpoints.ProductEndpoints.rootProducts}/shop`, {
      params
    });
  }

  getMostSalesProducts(): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>(`${ApiEndpoints.ProductEndpoints.rootProducts}/most-sales`);
  }

  getMixLatestProducts(): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>(`${ApiEndpoints.ProductEndpoints.rootProducts}/mix-latest-products`);
  }

  searchByMatchingName(searchValue: string): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>
    (`${ApiEndpoints.ProductEndpoints.rootProducts}/match-by-name/${searchValue}`);
  }

  getCustomProducts(productsCustomFilterDto: ProductsCustomFilterDto): Observable<ProductModel[]> {
    return this._http.post<ProductModel[]>(`${ApiEndpoints.ProductEndpoints.rootProducts}/custom-filter`, productsCustomFilterDto);
  }


  addToCart(productId: number, cartId: number, createCartProductDto: { quantity: number }): Observable<CartModel> {
    return this._http.post<CartModel>
    (`${ApiEndpoints.ProductEndpoints.rootProducts}/${productId}/add-to-cart/${cartId}`, createCartProductDto);
  }

}
