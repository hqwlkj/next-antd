import _ from 'lodash';
import _get from 'lodash/get';
import queryString from 'query-string';
import {
  FeaturedCreatorProductType,
  NewestFeaturedProductApiType,
  ProductsDataReturnType,
  Tag,
} from '@/types/marketplace.interface';
import { TAGS } from './app-constants';
import { Jewelry } from '@/types/jewelry.interface';

export const joinProductData = (
  productData: NewestFeaturedProductApiType,
  productData2: Jewelry,
): ProductsDataReturnType => {
  return {
    ...productData,
    avatarUrl: productData2?.store?.avatarUrl,
    storeHandle: productData2?.store?.handle,
    storeId: productData2?.store?.id,
    storeTitle: productData2?.store?.title,
    name: productData2.name,
    price: productData2.syncData?.priceRange?.maxVariantPrice?.amount,
    images: (productData2.syncData?.images?.edges ?? []).map((edge) =>
      _get(edge, 'node.originalSrc', ''),
    ),
    availableForSale: productData2.syncData?.availableForSale,
  };
};

export const createShopAllQueryString = (category: string, storeId: number[]) => {
  const params = {
    url: '/shop/all',
    query: {
      sorts: '-globalSort',
      category,
      storeId,
      page: 1,
      t: Date.now(),
    },
  };

  if (_.isEmpty(category)) {
    delete params.query.category;
  }

  if (_.isEmpty(storeId)) {
    delete params.query.storeId;
  }

  return queryString.stringifyUrl(params);
};

export const getTagColor = (value: string) => {
  const tag = TAGS.find((tag: Tag) => tag.value.toLowerCase() === value.toLowerCase());
  return _.get(tag, 'color', '#AEAECB');
};

export const groupById = (products: FeaturedCreatorProductType[]) => {
  return products.reduce((acc, product) => ({ ...acc, [product.id]: product }), {});
};

export const formatProducts = (
  products: FeaturedCreatorProductType[],
  productMap: any,
): FeaturedCreatorProductType[] => {
  return products.reduce(
    (acc: FeaturedCreatorProductType[], product: FeaturedCreatorProductType) => {
      return Object.prototype.hasOwnProperty.call(productMap, product.productId)
        ? [...acc, joinProductData(product, productMap[product.productId])]
        : acc;
    },
    [],
  );
};
