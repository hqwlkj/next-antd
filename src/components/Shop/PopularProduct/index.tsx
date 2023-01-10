import React from 'react';
import styles from './index.module.less';
import Link from 'next/link';
import FeaturedProduct from '@/components/Marketplace/FeaturedProduct';
import { FeaturedCreatorProductType } from '@/types/marketplace.interface';
import { formatPrice } from '@/shared/utils';
const PopularProduct = ({
  product,
  isMobile,
}: {
  product: FeaturedCreatorProductType;
  isMobile: boolean;
}) => {
  const handleClick = (productId: number) => {
    // TODO
    // const content = `productId: ${productId}, storeId: ${this.product.storeId}, originPath: ${this.$route.path}, destinationPath: /shop/${productId}, section: Popular Products`
    // this.$api.loggingService.logCommonView(EventSource.MARKETPLACE_POPULAR_PRODUCT_ITEM, content, this.$gtm)
  };

  return (
    <div className={styles.popularProduct} onClick={() => handleClick(product.productId)}>
      <Link href={`/shop/${product.productId}`} className={styles.popularProductImage}>
        <FeaturedProduct item={product} showInfo={false} showAvatar={false} isMobile={isMobile} />
      </Link>
      <div className={styles.information}>
        <Link href={`/shop/${product.productId}`} className={styles.productName}>
          <span>{product.name}</span>
        </Link>
        <Link href={`/designers/${product.storeHandle}`} className={styles.storeName}>
          <span>{product.storeTitle}</span>
        </Link>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
    </div>
  );
};

export default PopularProduct;
