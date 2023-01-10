import { useMemo } from 'react';
import { useShoppingCartProvider } from '@/context/ShoppingCartProvider';
import { Badge, Button, Drawer } from 'antd';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './index.module.less';
import { useConfigProvider } from '@/context/ConfigProvider';

const ChoppingCart = ({
  size = 'small',
  className,
}: {
  size?: 'large' | 'small';
  className?: string;
}) => {
  const { open, total, onOpenDrawer } = useShoppingCartProvider();
  const { isMobile } = useConfigProvider();
  const iconSrc = useMemo(() => {
    return size === 'large'
      ? '/images/layouts/cart-icon-120.png'
      : '/images/layouts/cart-icon-50.png';
  }, [size]);
  return (
    <div className={classNames(styles.shoppingCartWarp, className)}>
      <div
        className={classNames(styles.shoppingCartBtnIcon, {
          [styles.large]: size === 'large',
        })}
        onClick={() => onOpenDrawer(true)}
      >
        <Badge count={total}>
          <Image
            className="pietra"
            src={iconSrc}
            alt="Pietra"
            title="Pietra"
            width={40}
            height={11}
          />
        </Badge>
      </div>
      <Drawer
        title="Your Cart"
        // closable={false}
        width={isMobile ? '100%' : 400}
        placement="right"
        onClose={() => onOpenDrawer(false)}
        open={open}
        rootClassName={styles.shoppingCartDrawerWarp}
        key={'shopping-cart-drawer'}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button type="primary" block onClick={() => onOpenDrawer(false)}>
          Keep Browsing
        </Button>
      </Drawer>
    </div>
  );
};
export default ChoppingCart;
