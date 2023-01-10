import { IxParams } from '@/shared/typings';
import {
  SearchSuggestions,
  SuggestionsCategories,
  SuggestionsData,
} from '@/types/marketplace.interface';

export const isS3Image = (url: string) => {
  return url?.includes('static.pietrastudio.com') ?? false;
};
export function imgix(v: string, params?: IxParams) {
  if (!v || !isS3Image(v)) return v || '';
  const url = new URL(v);
  url.host = 'pietra.imgix.net';
  if (!params?.auto) {
    url.searchParams.append('auto', 'compress,format');
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.append(k, v);
    }
  }
  return url.toString();
}

export const isMobileByUserAgent = (userAgent: string) => {
  return Boolean(
    userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
  );
};
export const capitalizeString = (text: string) => {
  return (text || '')
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

type transformType =
  | 'pico'
  | 'icon'
  | 'thumb'
  | 'small'
  | 'compact'
  | 'medium'
  | 'large'
  | 'grande'
  | '1024'
  | '2048';

/**
 * @link https://www.evernote.com/l/AT59JlZLi4xFW72l5E6dvv2Jtt8eHEOPbrY
 * @param url
 * @param size
 */
export function imageTransform(url: string, size: transformType | string) {
  if (typeof url !== 'string') return url;

  const pietraS3SizeKeys = ['compact', 'large', 'grande', '1024'];
  const shopifySizeKeys = [
    'pico',
    'icon',
    'thumb',
    'small',
    'compact',
    'medium',
    'large',
    'grande',
    '1024',
    '2048',
  ];
  if (isS3Image(url)) {
    if (!pietraS3SizeKeys.includes(size)) return url;
    const regex = /(\/public.*?\/)/;
    return url.replace(regex, `/public_${size}/`);
  } else if (typeof size === 'string') {
    size = size.toLowerCase();
    if (!shopifySizeKeys.includes(size)) return url;
    if (['1024', '2048'].includes(size)) {
      size = `${size}x${size}`;
    }
  } else if (typeof size === 'number') {
    if (!(size > 0)) return url;
  } else {
    return url;
  }

  const pathArray = url.split('/');
  if (!/shopify\.com/.test(pathArray[2])) return url;

  const lastIndex = pathArray.length - 1;
  const tmpArray = pathArray[lastIndex].split('.');

  if (!/^(jpg|png|jpeg|webp)/i.test(tmpArray[1])) return url;

  const basename = tmpArray[0].replace(
    RegExp(`_(${shopifySizeKeys.join('|')}|\\d+x\\d+)$`, 'ig'),
    '',
  );
  tmpArray[0] = basename + `_${size}`;
  pathArray[lastIndex] = tmpArray.join('.');
  return pathArray.join('/');
}

export const convertSuggestions = (
  data: SuggestionsData,
  subcategoryValueMap: any,
): SearchSuggestions => {
  const arr: SearchSuggestions = {
    stores: [],
    items: [],
    categories: [],
  };
  if (data.storeList) {
    arr.stores = data.storeList;
  }
  // TODO <editor-fold desc="Suspicious unused code">
  const allCategories: SuggestionsCategories[] = [];
  if (data.categories) {
    data.categories.forEach(function (item) {
      allCategories.push({
        text: subcategoryValueMap[item] || item,
        value: item,
        param: 'category',
      });
    });
  }
  if (data.materials) {
    data.materials.forEach(function (item) {
      allCategories.push({
        text: capitalizeString(item),
        value: item,
        param: 'material',
      });
    });
  }
  if (data.gemstones) {
    data.gemstones.forEach(function (item) {
      allCategories.push({
        text: capitalizeString(item),
        value: item,
        param: 'gemstone',
      });
    });
  }
  arr.categories = allCategories.length > 4 ? allCategories.slice(0, 4) : allCategories;
  // </editor-fold>
  if (data.list) {
    arr.items = data.list.map((text) => ({ text }));
  }
  return arr;
};

export const shopAllLink = (title: string, params: any) => {
  if (params.exactRoute) {
    return params.exactRoute;
  }
  const urlPath = title ? new URLSearchParams({ ...params, title }) : '';
  return `/shop/all?${urlPath}`;
};

export const zeroPaddedNumber = (num: number): string => {
  return `${num}`.padStart(2, '0');
};

export const formatPrice = (price: string): string => {
  if (!price) return '';

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    parseFloat(price),
  );
};
