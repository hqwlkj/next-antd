import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, NavHamburger, NavMobileSearch } from '@/components/Layouts';
import styles from './index.module.less';
const MobileHeader = () => {
  return (
    <div className={styles.mobileHeaderWarp}>
      <div className={styles.navToolbar}>
        <div className={styles.navToolbarSection}>
          <NavHamburger />
          <NavMobileSearch className={styles.searchIcon} />
        </div>
        <div className={styles.navToolbarSection}>
          <Link href="/" className={styles.logo}>
            <Image
              className={styles.pietra}
              src="/images/layouts/small-logo.png"
              alt="Pietra"
              title="Pietra"
              width={40}
              height={11}
            />
          </Link>
        </div>
        <div className={styles.navToolbarSection}>
          <ShoppingCart className={styles.cartIcon} />
        </div>
      </div>
    </div>
  );
};
export default MobileHeader;
