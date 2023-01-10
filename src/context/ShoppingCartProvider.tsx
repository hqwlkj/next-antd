import React, { createContext, useContext, useEffect, useState } from 'react';
import { message } from 'antd';

type ShopCarProviderType = {
  /**
   * total cart quantity
   */
  total?: number;
  open?: boolean;
  /**
   * add cart callback function
   * @param params Product information added
   */
  onAddShop?: <P = any>(params: P) => Promise<{ data: P }>;
  onDeleteShopCarItem?: <P = any>(params: P) => Promise<{ data: P }>;
  onOpenDrawer?: (open: boolean) => void;
  /**
   * Refresh cart data
   */
  onRefreshCartData?: () => Promise<void>;
};

const Context = createContext<ShopCarProviderType>({});
const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalCartQuantity, setTotalCartQuantity] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);
  const handleAddShopCarItem = async (params: any) => {
    console.log('addShopItemParams:', params);
    return Promise.resolve(params);
  };

  useEffect(() => {
    // The initialization is to get the total number of shopping carts
    setTotalCartQuantity(10);
  }, []);

  const handleOpenDrawer = (open: boolean) => {
    setOpen(open);
  };

  const handleRefreshCartData = async () => {
    return new Promise<void>((resolve) => {
      message.success('Refresh successfully', 1.2, () => resolve(null));
    });
  };

  const exposed = {
    open,
    total: totalCartQuantity,
    onAddShop: handleAddShopCarItem,
    onOpenDrawer: handleOpenDrawer,
    onRefreshCartData: handleRefreshCartData,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useShoppingCartProvider = () => useContext(Context);

export default ShoppingCartProvider;
