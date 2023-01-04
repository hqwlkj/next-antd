import React from 'react';
import { GlobalFooter, GlobalHeader } from '@/components';
import styles from './index.module.less';
import { useRouter } from 'next/router';

interface LayoutProps {
  /**
   * Please use next/head
   */
  head?: React.ReactNode;
  children: React.ReactNode;
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.pietrastudio.com/commons/business-settings/DISPLAY/CATEGORY_NAV_DROPDOWN_ITEMS`,
  );
  console.log('res:', res);
  return {
    categoryNavDropdownItems: [],
  };
}
const Layout = ({ children, head }: LayoutProps) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.layout}>
      {head}
      <header className={styles.header}>
        <GlobalHeader
          isMarketplaceHome={pathname === '/'}
          navItems={[
            {
              text: 'Shop All',
              path: '/shop/all',
            },
            {
              text: 'Discover',
              dropdownItems: [
                {
                  text: 'Shop All',
                  path: '/shop/all',
                },
                {
                  text: 'Shop All',
                  path: '/shop/all',
                },
              ],
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
