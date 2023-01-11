import React from 'react';
import { FeaturedCreatorProductType } from '@/types/marketplace.interface';
import styles from './index.module.less';
import classNames from 'classnames';
import { zeroPaddedNumber } from '@/shared/utils';
import PopularProduct from '@/components/Shop/PopularProduct';
import { useConfigProvider } from '@/context/ConfigProvider';
import { Carousel } from 'antd';

const PopularProducts = ({
  products,
  vertical,
  numbered,
}: {
  products: FeaturedCreatorProductType[];
  vertical: boolean;
  numbered: boolean;
}) => {
  const { isMobile } = useConfigProvider();

  const onPopularItemClick = (productId: number) => {
    // TODO
  };

  return (
    <div className={classNames(styles.popularProductsContainer, vertical ? styles.vertical : '')}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Popular Products </span>
        <img className={styles.star} src="/images/star.png" alt="star" title="star" />
      </div>
      {vertical && !isMobile ? (
        <div className={styles.popularProducts}>
          {products.length > 0 && (
            <>
              {products.map((product, i) => (
                <div className={styles.productItem} key={`product-${i}`}>
                  {numbered && (
                    <span className={styles.productNumber}>{zeroPaddedNumber(i + 1)}</span>
                  )}
                  <PopularProduct product={product} />
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className={styles.popularProducts}>
          <Carousel autoplay>
            {products.map((product, i) => (
              <div className={styles.slide} key={i}>
                <PopularProduct product={product} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
