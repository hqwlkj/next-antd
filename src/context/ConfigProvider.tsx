import { createContext, useContext, useEffect, useState } from 'react';
import ResizeObserver from 'rc-resize-observer';
import type { SizeInfo } from 'rc-resize-observer';
import useBusinessSettingsDisplay from '@/lib/hooks/common/useBusinessSettingsDisplay';
import { useRouter } from 'next/router';

type ProviderType = {
  isMobile?: boolean;
  isShopPage?: boolean;
  menus?: Array<any>;
  screenSize?: SizeInfo;
};
const Context = createContext<ProviderType>({});
const Provider = ({ children }: any) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<SizeInfo>();
  const router = useRouter();
  const { value: menuRes } = useBusinessSettingsDisplay('CATEGORY_NAV_DROPDOWN_ITEMS');

  const menuList = menuRes?.value || [];

  const handleIsMobile = (size: SizeInfo) => {
    setScreenSize(size);
    setIsMobile(size.width < 750);
  };

  const exposed = {
    menus: menuList,
    isShopPage: router.pathname.startsWith('/shop'),
    isMobile,
    screenSize,
  };

  return (
    <Context.Provider value={exposed}>
      <ResizeObserver key="resize-observer" onResize={handleIsMobile}>
        {children}
      </ResizeObserver>
    </Context.Provider>
  );
};

export const useConfigProvider = () => useContext(Context);

export default Provider;
