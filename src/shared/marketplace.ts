import _ from 'lodash';
import _get from 'lodash/get';
import queryString from 'query-string';
import {
  FeaturedCreatorProductType,
  FeaturedCreatorType,
  NewestFeaturedProductApiType,
  ProductsDataApiType,
  ProductsDataReturnType,
  Tag,
} from '@/types/marketplace';
import { TAGS } from './app-constants';

export const defaultFeaturedCreators: FeaturedCreatorType[] = [
  {
    storeHandle: 'megan-ewoldsen',
    category: 'Coffee',
    instagram: 'meganewoldsen',
    fullName: 'Megan Ewoldsen',
    imageUrl:
      'https://static.pietrastudio.com/public/file_uploads/ba0038aec84f93429864ab1fd5ac8cd0.jpg',
  },
  {
    storeHandle: 'dylanandmia',
    category: 'Beauty',
    instagram: 'shopdylan_mia',
    fullName: 'Dylan & Mia',
    imageUrl:
      'https://static.pietrastudio.com/public/file_uploads/f4644e387e9f942ad4c947e926444a54.jpg',
  },
  {
    storeHandle: 'skin-by-ellaarose',
    category: 'Beauty',
    instagram: 'ellarose',
    fullName: 'Ella McFadin',
    imageUrl:
      'https://static.pietrastudio.com/public/file_uploads/7487be7ce5bcf71463b6a7c398c86719.png',
  },
  {
    storeHandle: 'zensational',
    category: 'Candles',
    instagram: 'ma_e_ra90',
    fullName: 'Mayra Garcia',
    imageUrl:
      'https://static.pietrastudio.com/public/file_uploads/880fe7fd1fe7777bf861078bb2bc9e3f.jpg',
  },
  {
    storeHandle: 'ilybaby',
    category: 'Fashion',
    instagram: 'shopilybaby',
    fullName: 'Hailey Sani',
    imageUrl:
      'https://static.pietrastudio.com/public/file_uploads/609401cddd5d4ace671666400c098535.jpg',
  },
  {
    storeHandle: 'orions-belt-1',
    category: 'Candles',
    instagram: 'orionsbeltonline',
    fullName: 'Nyisha Edwards',
    imageUrl:
      'https://static.pietrastudio.com/public/file_uploads/7123751676bbeaa07c91c9922351d3e6.jpeg',
  },
  {
    storeHandle: 'varnishta',
    category: 'Beauty',
    instagram: 'varnishta',
    fullName: 'Shannon',
    imageUrl:
      'https://static.pietrastudio.com/public_large/file_uploads/e9affc190aa70895d0baea7e8dcd109f.jpg',
  },
];

export const joinProductData = (
  productData: NewestFeaturedProductApiType,
  productData2: any,
): ProductsDataReturnType => {
  return {
    ...productData,
    avatarUrl: productData2?.store?.avatarUrl,
    storeHandle: productData2?.store?.handle,
    storeId: productData2?.store?.id,
    storeTitle: productData2?.store?.title,
    name: productData2.name,
    price: productData2.syncData.priceRange.maxVariantPrice.amount,
    images: productData2.syncData.images.edges.map((edge: any) =>
      _get(edge, 'node.originalSrc', ''),
    ),
    availableForSale: productData2.syncData.availableForSale,
  };
};

export async function getProductsData(
  shopService: any,
  products: ProductsDataApiType[],
): Promise<ProductsDataReturnType[]> {
  const updatedProducts = [];
  for (let i = 0; i < products.length; i++) {
    const productInfo = await shopService.getProductDetails(+products[i].productId);
    updatedProducts.push(joinProductData(products[i], productInfo.data));
  }
  return updatedProducts;
}

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
