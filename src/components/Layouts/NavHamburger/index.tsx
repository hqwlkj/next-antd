import { Drawer } from 'antd';
import { useToggle } from 'react-use';
import classNames from 'classnames';
import { useConfigProvider } from '@/context/ConfigProvider';
import styles from './index.module.less';
import type { ReactNode } from 'react';

const NavHamburger = ({ children }: { children?: ReactNode[] }) => {
  const { isMobile } = useConfigProvider();
  const [open, toggle] = useToggle(false);

  return (
    <div
      className={classNames(styles.navHamburgerWarp, {
        [styles.showClose]: open,
      })}
      onClick={toggle}
    >
      {new Array(3).fill(1).map((_, index) => (
        <span key={`burger-${index}`} className={styles.hamburgerLine} />
      ))}
      <Drawer
        title={'Explore Pietra'}
        closable
        width={isMobile ? '100%' : 400}
        placement="left"
        onClose={toggle}
        maskClosable={false}
        open={open}
        rootClassName={styles.leftMenuDrawerWarp}
        key={'left-menu-drawer'}
      >
        <div className={styles.mobileNavMenuWarp}>{children}</div>
      </Drawer>
    </div>
  );
};

export default NavHamburger;
