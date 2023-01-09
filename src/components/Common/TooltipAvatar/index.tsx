import React from 'react';
import styles from './index.module.less';
import Link from 'next/link';
import { imageTransform } from '@/shared/utils';
import classNames from 'classnames';

interface Props {
  avatarUrl: string;
  goToUrl: string;
  direction?: string;
  text: string;
  storeId: number;
  isMobile: boolean;
}

const TooltipAvatar = ({ avatarUrl, goToUrl, storeId, direction, text, isMobile }: Props) => {
  const logClick = () => {
    // TODO
    // this.$api.loggingService.logCommonView(EventSource.PRODUCT_GRID_ITEM_SHOP_AVATAR, this.storeId, this.$gtm)
  };

  return (
    <div className={styles.tooltipAvatar}>
      <Link href={goToUrl} className={styles.avatar} onClick={logClick}>
        {avatarUrl && (
          <img
            src={imageTransform(avatarUrl, 'compact')}
            alt="Creator avatar"
            title="Creator avatar"
          />
        )}
      </Link>
      {!isMobile && (
        <div className={styles.tooltipElement}>
          <span className={classNames(styles.tooltip, direction)}>
            <Link href={goToUrl} className={styles.goToShop}>
              {text}
            </Link>
          </span>
          <i className="arrow"></i>
        </div>
      )}
    </div>
  );
};

export default TooltipAvatar;
