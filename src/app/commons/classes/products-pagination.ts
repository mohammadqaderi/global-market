import {ProductModel} from '../../models/Products/product.model';

export class ProductsPagination {
  products: ProductModel[];
  currentPage: number;
  nextPage: number;
  previousPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  lastPage: number;
}
