import React from 'react';
import { FeaturedCreatorProductType, NewestFeaturedProductType } from '@/types/marketplace';
import { EventSource } from '@/shared/event-types';
import Link from 'next/link';
import styles from './index.module.less';
import classNames from 'classnames';
import TooltipAvatar from '@/components/Common/TooltipAvatar';
import { imageTransform } from '@/shared/utils';
interface Props {
  item: NewestFeaturedProductType | FeaturedCreatorProductType;
  showInfo: boolean;
  showAvatar: boolean;
  customStyle?: Record<string, string | number>;
  originEventName?: EventSource;
  isMobile: boolean;
}
const FeaturedProduct = ({
  item,
  showInfo,
  showAvatar,
  originEventName,
  isMobile,
  customStyle,
}: Props) => {
  const formatPrice = (price: string): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      parseFloat(price),
    );
  };
  const logClick = () => {
    // TODO
    // this.$api.loggingService.logCommonView(this.originEventName, this.item.productId, this.$gtm)
  };

  const image1 = item?.images[0];
  const image2 = item?.images[1];
  const isSoldOut = item?.availableForSale;

  return (
    <Link
      href={`/shop/${item.productId}`}
      className={classNames(styles.item, showInfo ? styles.showInfo : '')}
      style={customStyle}
      onClick={logClick}
    >
      {showAvatar && item.avatarUrl && (
        <TooltipAvatar
          avatarUrl={item.avatarUrl}
          goToUrl={`/designers/${item.storeHandle}`}
          text={'View Brand'}
          storeId={item.storeId}
          isMobile={isMobile}
        />
      )}
      <div className={styles.imageContainer}>
        {image1 && (
          <img
            src={imageTransform(image1, 'large')}
            className={styles.image1}
            alt={item.name}
            title={item.name}
          />
        )}
        {image2 && !isMobile && (
          <img
            src={imageTransform(image2, 'grande')}
            className={styles.image2}
            alt={item.name}
            title={item.name}
          />
        )}
      </div>
      {showInfo && (
        <div className={styles.showInfo}>
          <div className={styles.left}>
            <Link href={`/designers/${item.storeHandle}`} className={styles.itemLink}>
              {'storeTitle' in item ? item.storeTitle : ''}
            </Link>
          </div>
          {isSoldOut && <span className={styles.soldOutTag}>Sold Out</span>}
        </div>
      )}
    </Link>
  );
};

export default FeaturedProduct;
