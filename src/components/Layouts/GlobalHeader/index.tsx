import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import styles from './index.module.less';
import RetroTitle from '@/components/Common/RetroTitle';
import type { MarketplaceNavItem } from '@/components/Layouts';
import { NavItem, ShoppingCart, MobileHeader } from '@/components/Layouts';
import UniversalSearch from '@/components/Marketplace/UniversalSearch';

interface GlobalHeaderProps {
  isShopPage?: boolean;
  isMarketplaceHome?: boolean;
  navItems?: MarketplaceNavItem[];
  isMobile?: boolean;
}
const GlobalHeader = ({ navItems, isShopPage, isMarketplaceHome, isMobile }: GlobalHeaderProps) => {
  const getNavLeftSection = useMemo(() => {
    if (!!isMarketplaceHome) {
      return (
        <div className={styles.navTitleContainer}>
          <div className={styles.catchPhrase}>
            <RetroTitle text="Where Brands Tell Their Stories" textColor="#ff401a" fontSize={28} />
            <span className={styles.poweredBy}>
              Powered By
              <Link href="/" className={styles.logo}>
                <Image
                  className="pietra"
                  src="/images/layouts/small-logo.png"
                  alt="Pietra"
                  title="Pietra"
                  width={40}
                  height={11}
                />
              </Link>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.navSearch}>
          <Link href="/">
            <Image
              className={styles.sparkStone}
              src="/images/layouts/spark-stone-logo.png"
              alt="Pietra"
              title="Pietra"
              width={40}
              height={11}
            />
          </Link>
          <UniversalSearch />
        </div>
      );
    }
  }, [isMarketplaceHome]);

  const formatMenuData = useCallback(
    (navItems?: MarketplaceNavItem[]): MarketplaceNavItem[] => {
      if (isMobile) {
        return navItems?.reduce(
          (acc: MarketplaceNavItem[], cur: MarketplaceNavItem) => {
            return cur?.dropdownItems ? [...acc, ...cur?.dropdownItems] : [...acc, cur];
          },
          [
            {
              text: 'Home',
              path: '/marketplace',
            },
          ],
        );
      }
      return navItems;
    },
    [isMobile],
  );

  const renderNavRightSection = useMemo(() => {
    return formatMenuData(navItems)?.map((item, index) => (
      <NavItem
        item={item}
        key={index}
        className={classNames('', {
          'mobile-left-menu-item': isMobile,
        })}
      />
    ));
  }, [formatMenuData, isMobile, navItems]);

  if (isMobile) {
    return <MobileHeader>{renderNavRightSection}</MobileHeader>;
  }
  return (
    <div
      className={classNames(styles.globalHeaderWarp, {
        [styles.shopPage]: isShopPage,
      })}
    >
      <div className={styles.navSection}>{getNavLeftSection}</div>
      <div className={styles.navSection}>
        {renderNavRightSection}
        <ShoppingCart className={styles.cartIcon} />
      </div>
    </div>
  );
};

export default GlobalHeader;
