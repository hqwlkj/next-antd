import { CaretDownOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { useRouter } from 'next/router';
export interface MarketplaceNavItem {
  text: string;
  path?: string;
  icon?: { left: string; right: string };
  dropdownItems?: MarketplaceNavItem[];
  onClick?: (item: MarketplaceNavItem) => void;
}
const NavItem = ({ item }: { item: MarketplaceNavItem }) => {
  const router = useRouter();
  const handleItemClick = (item: MarketplaceNavItem) => {
    if (item?.onClick) {
      item.onClick(item);
      return;
    }
    router.push(item?.path || '/');
  };
  const renderItem = (item: MarketplaceNavItem, index?: string | number) => {
    return (
      <div className={styles.navItemWarp} key={index} onClick={() => handleItemClick(item)}>
        <span className={styles.navItemText}>{item.text}</span>
        {item.dropdownItems && <CaretDownOutlined />}
        {item.dropdownItems && (
          <div className={styles.navDropdown}>
            {item.dropdownItems.map((childItem, cIndex) =>
              renderItem(childItem, `nav-dropdown-item-${cIndex}`),
            )}
          </div>
        )}
      </div>
    );
  };
  return renderItem(item, `nav-item`);
};
export default NavItem;
