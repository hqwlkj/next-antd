import React from 'react';
import { GlobalFooter } from '@/components';
import styles from './index.module.less';

interface LayoutProps {
  /**
   * Please use next/head
   */
  head?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ children, head }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      {head}
      <header className={styles.header}>header</header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <GlobalFooter />
      </footer>
    </div>
  );
};
export default Layout;
