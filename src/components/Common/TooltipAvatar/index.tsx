import React from 'react';
import styles from './index.module.less';
import Link from 'next/link';
import { imageTransform } from '@/shared/utils';
import classNames from 'classnames';
import { useConfigProvider } from '@/context/ConfigProvider';
import { logCommonView } from '@/lib/service';
import { EventSource } from '@/shared/event-types';

interface Props {
  avatarUrl: string;
  goToUrl: string;
  direction?: string;
  text: string;
  storeId: number;
}

const TooltipAvatar = ({ avatarUrl, goToUrl, storeId, direction, text }: Props) => {
  const { isMobile } = useConfigProvider();
  const logClick = () => {
    logCommonView(EventSource.PRODUCT_GRID_ITEM_SHOP_AVATAR, storeId);
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
