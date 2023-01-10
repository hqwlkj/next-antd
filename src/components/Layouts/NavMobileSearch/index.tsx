import { KeyboardEvent, useCallback, useState } from 'react';
import { Drawer, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useConfigProvider } from '@/context/ConfigProvider';
import { useToggle } from 'react-use';
import { useRouter } from 'next/router';
import { shopAllLink } from '@/shared/utils';
import styles from './index.module.less';

const NavMobileSearch = ({ className }: { className?: string }) => {
  const { isMobile } = useConfigProvider();
  const router = useRouter();
  const [open, toggle] = useToggle(false);
  const [searchValue, setSearchValue] = useState<string>();

  const handleSearch = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();
      router.push(
        shopAllLink(searchValue, {
          text: searchValue,
          scrollToTop: true,
        }),
      );
    },
    [router, searchValue],
  );

  return (
    <div className={classNames(styles.navMobileSearchWarp, className)}>
      <SearchOutlined onClick={toggle} />
      <Drawer
        title={false}
        closable={true}
        width={isMobile ? '100%' : 400}
        height={'100vh'}
        placement="top"
        onClose={toggle}
        open={open}
        rootClassName={styles.navSearchDrawerWarp}
        key={'left-menu-drawer'}
      >
        <div className={styles.searchWarp}>
          <Input
            className={styles.shopSearchField}
            placeholder={'Search'}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
          />
          <p className={styles.shopSearchTip}>Search products and creators.</p>
        </div>
      </Drawer>
    </div>
  );
};

export default NavMobileSearch;
