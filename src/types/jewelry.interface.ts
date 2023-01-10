import { Store } from '@/types/store.interface';

export interface AllJewelryQuery {
  jewelryIds?: number[];
  size?: number;
  page?: number;
  includeVariantField?: boolean;
  sorts?: string;
  category?: string;
  isFetchStoreList?: boolean;
  isFetchPopularData?: boolean;
}

export interface SyncData {
  id: string;
  title: string;
  description: string;
  priceRange: PriceRange;
  availableForSale: boolean;
  images: Images;
}

export interface Images {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  id: string;
  altText?: any;
  originalSrc: string;
  transformedSrc: string;
}

export interface PriceRange {
  maxVariantPrice: MaxVariantPrice;
  minVariantPrice: MinVariantPrice;
}

export interface MaxVariantPrice {
  amount: string;
  currencyCode: string;
}

export interface MinVariantPrice {
  amount: string;
  currencyCode: string;
}

export interface Jewelry {
  id: number;
  name: string;
  storeId: number;
  isEnabled: boolean;
  syncData: SyncData;
  store: Store;
  categories: string[];
  gemstones: any[];
  materials: string[];
  coverUrls?: any;
}
