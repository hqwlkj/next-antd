import React from 'react';
import styles from './index.module.less';
import Link from 'next/link';
import FeaturedProduct from '@/components/Marketplace/FeaturedProduct';
import { FeaturedCreatorProductType } from '@/types/marketplace.interface';
import { formatPrice } from '@/shared/utils';
import { EventSource } from '@/shared/event-types';
import { logCommonView } from '@/lib/service';
import { useRouter } from 'next/router';

const PopularProduct = ({ product }: { product: FeaturedCreatorProductType }) => {
  const router = useRouter();
  const handleClick = (productId: number) => {
    const content = `productId: ${productId}, storeId: ${product.storeId}, originPath: ${router.pathname}, destinationPath: /shop/${productId}, section: Popular Products`;
    logCommonView(EventSource.MARKETPLACE_POPULAR_PRODUCT_ITEM, content);
  };

  return (
    <div className={styles.popularProduct} onClick={() => handleClick(product.productId)}>
      <Link href={`/shop/${product.productId}`} className={styles.popularProductImage}>
        <FeaturedProduct item={product} showInfo={false} showAvatar={false} />
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
