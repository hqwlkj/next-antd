import React from 'react';
import Hero from './Hero';
import styles from './index.module.less';

const Home = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className={styles.appHome}>
      <Hero isMobile={isMobile} />
    </div>
  );
};

export default Home;
