import {ProductTagModel} from '../../../models/Products/product-tag.model';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';

export function productsTagsInit(subCategory: SubCategoryModel, tags?: ProductTagModel[]) {
  let productsTags = [];
  let uniqueArray: ProductTagModel[] = [];
  if (subCategory) {
    for (let i = 0; i < subCategory.products.length; i++) {
      for (let j = 0; j < subCategory.products[i].productTags.length; j++) {
        productsTags = [...productsTags, subCategory.products[i].productTags[j]];
      }
    }
    for (let i = 0; i < productsTags.length; i++) {
      const item = uniqueArray.find(item => item.name === productsTags[i].name);
      if (!item) {
        uniqueArray = [...uniqueArray, productsTags[i]];
      }
    }
  } else if(tags){
    for (let i = 0; i < tags.length; i++) {
      const item = uniqueArray.find(item => item.name === tags[i].name);
      if (!item) {
        uniqueArray = [...uniqueArray, tags[i]];
      }
    }
  }

  productsTags = uniqueArray;
  return productsTags;
}
