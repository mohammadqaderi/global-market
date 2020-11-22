export class ProductsCustomFilterDto {
  range1?: number;
  range2?: number;
  limit: number;
  page: number;
  subCategoryId?: number;
  tag?: string;
  stock?: string;
}
