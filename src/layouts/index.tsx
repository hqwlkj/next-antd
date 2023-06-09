import React from 'react';
import { useRouter } from 'next/router';
import { GlobalHeader, GlobalFooter } from '@/components/Layouts';
import { useConfigProvider } from '@/context/ConfigProvider';
import classNames from 'classnames';
import SellOnPietraDialog from '../components/Layouts/SellOnPietraDialog';
import { useToggle } from 'react-use';
import './index.less';

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
  const { menus, isMobile, isShopPage } = useConfigProvider();
  const [open, toggle] = useToggle(false);

  return (
    <div className={'layout'}>
      {head}
      <header className={'header'}>
        <GlobalHeader
          isMobile={isMobile}
          isMarketplaceHome={pathname === '/'}
          isShopPage={isShopPage}
          navItems={[
            {
              text: 'Shop All',
              path: '/shop/all',
            },
            {
              text: 'Discover',
              dropdownItems: menus || [],
            },
            {
              text: 'Sell on Pietra',
              onClick: () => {
                toggle();
              },
            },
          ]}
        />
        <SellOnPietraDialog isMobile={isMobile} isModalOpen={open} onCancel={toggle} />
      </header>
      <main
        className={classNames('main', {
          mobile: isMobile,
        })}
      >
        {children}
      </main>
      <footer className={'footer'}>
        <GlobalFooter />
      </footer>
    </div>
  );
};
export default Layout;
