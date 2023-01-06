export interface DesignerPortfolio {
  uid: string;
  xhr: {
    uid: string;
  };
  name: string;
  size: number;
  type: string;
  status: string;
  percent: number;
  response: {
    url: string;
    originalUrl: string;
  };
  lastModified: number;
  originFileObj: {
    uid: string;
  };
  lastModifiedDate: string;
}

export interface FeaturedCreatorType {
  category?: string;
  description?: string;
  fullName?: string;
  imageUrl?: string;
  instagram?: string;
  storeHandle?: string;
  storeId?: number;
  tags?: string[];
  title?: string;
}

export interface FeaturedCreatorProductType {
  id?: number;
  name: string;
  price: string;
  storeHandle: string;
  storeId: number;
  storeTitle?: string;
  productId: number;
  imageUrl: string;
  avatarUrl: string;
  images?: string[];
  availableForSale?: boolean;
}

export interface FeaturedCreatorProductApiType {
  storeHandle: string;
  storeTitle?: string;
  productId: number;
  imageUrl: string;
  avatarUrl: string;
}

export interface NewestFeaturedProductType {
  name: string;
  price: string;
  storeHandle: string;
  storeId: number;
  productId: number;
  imageUrl: string;
  avatarUrl: string;
  images?: string[];
  availableForSale?: boolean;
}

export interface NewestFeaturedProductApiType {
  storeHandle: string;
  productId: number;
  imageUrl: string;
  avatarUrl: string;
}

export interface FeaturedComingSoonType {
  category: string;
  instagram: string;
  storeHandle: string;
  imageUrl: string;
}

export interface PopularDataType {
  jewelryList: any[];
  storeList: any[];
}

export type CreatorItemType = FeaturedCreatorType | FeaturedComingSoonType;
export type ProductsDataApiType = FeaturedCreatorProductApiType | NewestFeaturedProductApiType;
export type ProductsDataReturnType = FeaturedCreatorProductType | NewestFeaturedProductType;
export type MobileFeaturedCreatorData = [FeaturedCreatorType, FeaturedCreatorType];

export interface TrendingHeroImageType {
  imageUrl: string;
  type: 'image';
  category: string;
  instagram: string;
  storeHandle: string;
  fullName: string;
}

export interface TrendingHeroVideoType {
  src: string;
  type: 'video';
  category: string;
  instagram: string;
  storeHandle: string;
  fullName: string;
}

export type TrendingHeroContentType = TrendingHeroImageType | TrendingHeroVideoType;

export interface TrendingDataType {
  title: string;
  description: string;
  heroContent: TrendingHeroContentType[];
  products?: CreatorItemType[];
  creators: ProductsDataApiType[];
}

export interface MarketplaceNavItem {
  text: string;
  path: string;
  icon?: { left: string; right: string };
  dropdownItems?: MarketplaceNavItem[];
  onClick?: (item: MarketplaceNavItem) => void;
}

export interface LineItem {
  id: number;
  jewelryId: number;
  quantity: number;
  title: string;
  store: {
    avatarUrl: string;
    id: number;
    title: string;
  };
  variant: {
    id: string;
    image: {
      altText: string;
      id: string;
      originalSrc: string;
      transformedSrc: string;
    };
    price: string;
    product: {
      id: string;
      title: string;
    };
    title: string;
  };
}

export interface ShopifyImage {
  id: string;
  altText: string;
  originalSrc: string;
  transformedSrc: string;
}

export interface ShopifyConnection<T> {
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  edges: {
    cursor: string;
    node: T;
  }[];
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  updatedAt: string;
  image: ShopifyImage;
}

export interface ShopifyProductVariant {
  id: string;
  availableForSale: boolean;
  requiresShipping: boolean;
  compareAtPrice?: string;
  image: ShopifyImage;
  price: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: { name: string; value: string }[];
  sku: string;
  title: string;
  weight: number;
  weightUnit: string;
}

export interface ShopifyProduct {
  id: string;
  availableForSale: boolean;
  createdAt: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  onlineStoreUrl: string;
  options: { id: string; name: string; values: string[] }[];
  priceRange: {
    maxVariantPrice: { currencyCode: string; amount: string };
    minVariantPrice: { currencyCode: string; amount: string };
  };
  productType: string;
  publishedAt: string;
  tags: string[];
  title: string;
  vendor: string;
  images: ShopifyConnection<ShopifyImage>;
  variants: ShopifyConnection<ShopifyProductVariant>;
  collections: ShopifyConnection<ShopifyCollection>;
}

export interface CartItem {
  variantEdgeNode: ShopifyProductVariant;
  id: number;
  anonymousUserId: string;
  userId: string;
  jewelryId: number;
  storeId: number;
  variantId: string;
  quantity: number;
  checkoutId: string;
  createdAt: string;
  updatedAt: string;
  store: {
    handle: string;
    avatarUrl: string;
    id: number;
    title: string;
  };
  jewelry: {
    id: number;
    name: string;
    storeId: number;
    syncData: ShopifyProduct;
    isFromPrintful: boolean;
    isEnabled: boolean;
  };
}

export interface CartInfo {
  cartItems: Array<{
    handle: string;
    avatarUrl: string;
    id: number;
    title: string;
    items: CartItem[];
  }>;
}

export interface CheckoutInfo {
  lineItems: LineItem[];
  remoteCheckoutId: string;
  remoteCheckoutUrl: string;
}

export interface SearchParam {
  sorts?: string | string[];
  category?: string;
  text?: string;
  minPriceRanges?: string;
  page?: number;
  predefinedText?: string;
  storeId?: string;
  isFetchStoreList?: boolean;
  isFetchPopularData?: boolean;
}

export interface DesignerProfileQuestion {
  question: string;
  answer: string;
}

export enum ExternalFieldName {
  SEEN_PRODUCT_TOUR = 'seenProductTour',
  STORE_PROFILE_QUESTIONS = 'storeProfileQuestions',
}

export interface Tag {
  value: string;
  color: string;
}

export enum PdpProductMeta {
  FEW = 'FEW',
  LIMITED = 'LIMITED',
  BRAND_SHIPPING = 'BRAND_SHIPPING',
}

export interface Breadcrumb {
  text: string;
  path: string;
}

export interface SearchTerm {
  categories: string[];
  storeIds: number[];
  text: string;
}

export interface TextPlaceholderLine {
  height: string;
  width: string;
  color: string;
}
