import React from 'react';
import styles from './index.module.less';
import { useRouter } from 'next/router';
import GlobalHeader from '@/components/Layouts/GlobalHeader';
import GlobalFooter from '@/components/Layouts/GlobalFooter';
import { useConfigProvider } from '@/context/ConfigProvider';

interface LayoutProps {
  /**
   * Please use next/head
   */
  head?: React.ReactNode;
  children: React.ReactNode;
}

// export async function getServerSideProps() {
//   const res = await fetch(
//     `https://api.pietrastudio.com/commons/business-settings/DISPLAY/CATEGORY_NAV_DROPDOWN_ITEMS`,
//   );
//   console.log('res:', res);
//   return {
//     categoryNavDropdownItems: [],
//   };
// }
const Layout = ({ children, head }: LayoutProps) => {
  const { pathname } = useRouter();
  const { menus, isMobile } = useConfigProvider();

  return (
    <div className={styles.layout}>
      {head}
      <header className={styles.header}>
        <GlobalHeader
          isMarketplaceHome={pathname === '/'}
          navItems={[
            {
              text: `Shop All ${isMobile}`,
              path: '/shop/all',
            },
            {
              text: 'Discover',
              dropdownItems: menus || [],
            },
            {
              text: 'Sell on Pietra',
              onClick: () => {
                alert('Sell on Pietra');
              },
            },
          ]}
        />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <GlobalFooter />
      </footer>
    </div>
  );
};
export default Layout;
