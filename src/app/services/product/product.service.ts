import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductModel} from '../../models/Products/product.model';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {CartProductModel} from '../../models/Cart/cart-product.model';
import {UpdateProductDto} from '../../commons/public-dto/update-product.dto';
import {ProductTagModel} from '../../models/Products/product-tag.model';
import {GetProductsByRangeDto} from '../../commons/public-dto/get-products-by-range.dto';

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

  getMonthProducts(): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>(`${ApiEndpoints.ProductEndpoints.rootProducts}/current-month`);
  }

  getProductsByTagName(tagName: string): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>
    (`${ApiEndpoints.ProductEndpoints.rootProducts}/search-by-tag-name/${tagName}`);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this._http.get<ProductModel>(`${ApiEndpoints.ProductEndpoints.rootProducts}/${id}`);
  }

  getFilteredProductsByRange(getProductsByRangeDto: GetProductsByRangeDto): Observable<ProductModel[]> {
    return this._http.post<ProductModel[]>(`${ApiEndpoints.ProductEndpoints.rootProducts}/filtered-by-range`, getProductsByRangeDto);
  }

  getProductsByStockExistence(stock: boolean): Observable<ProductModel[]> {
    let params = new HttpParams();
    params = params.append('stock', String(stock));
    return this._http.get<ProductModel[]>
    (`${ApiEndpoints.ProductEndpoints.rootProducts}/filtered-by-stock-existence`, {
      params
    });
  }

  updateProduct(id: number, updateProductDto: UpdateProductDto): Observable<ProductModel> {
    return this._http.put<ProductModel>(`${ApiEndpoints.ProductEndpoints.rootProducts}/${id}/update`, updateProductDto);
  }

  manageProductImages(id: number, formImages: any,
                      type: string, folderName = 'products', subFolder = 'products-images') {
    const url = `${ApiEndpoints.ProductEndpoints.rootProducts}/${id}/manage-images/${folderName}/${subFolder}/${type}`;
    return this._http.put(url, formImages);
  }

  addToCart(productId: number, cartId: number, createCartProductDto: { quantity: number }): Observable<CartProductModel> {
    return this._http.post<CartProductModel>
    (`${ApiEndpoints.ProductEndpoints.rootProducts}/${productId}/add-to-cart/${cartId}`, createCartProductDto);
  }

  addTagsToProduct(id: number, payload: { tags: number[] }): Observable<ProductTagModel[]> {
    return this._http.post<ProductTagModel[]>(`${ApiEndpoints.ProductEndpoints.rootProducts}/${id}/add-tags`, payload);
  }


  removeTagsFromProduct(id: number, payload: { tags: number[] }): Observable<ProductModel> {
    return this._http.request<ProductModel>('delete', `${ApiEndpoints.ProductEndpoints.rootProducts}/${id}/remove-tags`,
      {
        body: {
          payload
        }
      });
  }

  deleteProduct(id: number): Observable<void> {
    return this._http.delete<void>(`${ApiEndpoints.ProductEndpoints.rootProducts}/${id}/delete`);
  }


}
