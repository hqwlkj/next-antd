import { Button, Drawer } from 'antd';
import { useToggle } from 'react-use';
import classNames from 'classnames';
import { useConfigProvider } from '@/context/ConfigProvider';
import styles from './index.module.less';

const NavHamburger = () => {
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
        title={null}
        closable={false}
        width={isMobile ? '100%' : 400}
        placement="left"
        onClose={toggle}
        open={open}
        rootClassName={styles.leftMenuDrawerWarp}
        key={'left-menu-drawer'}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default NavHamburger;
