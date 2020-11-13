import {ProductTagModel} from './product-tag.model';

export class ProductModel  {
  id: number;

  name: string;

  quantity: number;

  images: string[];

  description: string;

  references: number[];

  inStock: boolean;

  currentPrice: number;

  previousPrice: number;

  sales: null;

  productTags: ProductTagModel[];

  createdAt: Date;

  updatedAt: Date;

  subCategoryId: number;
}
