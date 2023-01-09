import React from 'react';
import { FeaturedCreatorProductType } from '@/types/marketplace';
import styles from './index.module.less';
import classNames from 'classnames';
import { zeroPaddedNumber } from '@/shared/utils';
import PopularProduct from '@/components/Shop/PopularProduct';

const PopularProducts = ({
  products,
  vertical,
  numbered,
  isMobile,
}: {
  products: FeaturedCreatorProductType[];
  vertical: boolean;
  numbered: boolean;
  isMobile: boolean;
}) => {
  const productInfoLines = [
    { width: '100%', height: '30px', color: '#e8e8e8' },
    { width: '90%', height: '10px', color: '#e8e8e8' },
    { width: '50%', height: '10px', color: '#e8e8e8' },
  ];

  const onPopularItemClick = (productId: number) => {
    // TODO
  };

  return (
    <div className={classNames(styles.popularProductsContainer, vertical ? styles.vertical : '')}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Popular Products </span>
        <img className={styles.star} src="/images/star.png" alt="star" title="star" />
      </div>
      {vertical && !isMobile && (
        <div className={styles.popularProducts}>
          {products.length > 0 && (
            <>
              {products.map((product, i) => (
                <div className={styles.productItem} key={`product-${i}`}>
                  {numbered && (
                    <span className={styles.productNumber}>{zeroPaddedNumber(i + 1)}</span>
                  )}
                  <PopularProduct product={product} isMobile={isMobile} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
