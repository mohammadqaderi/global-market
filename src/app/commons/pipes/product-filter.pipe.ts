import { Pipe, PipeTransform } from '@angular/core';
import {ProductModel} from '../../models/Products/product.model';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: ProductModel[], searchTerm: string): ProductModel[] {
    if (!products || !searchTerm) {
      return products;
    }
    return products.filter(product =>
      product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }

}
