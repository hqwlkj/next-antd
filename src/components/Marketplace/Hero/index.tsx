import React from 'react';
import CatchPhrase from '@/components/Marketplace/CatchPhrase';
import useScreenSize from '@/lib/hooks/utils/useScreenSize';
import styles from './index.module.less';
import classNames from 'classnames';
import UniversalSearch from '@/components/Marketplace/UniversalSearch';

const Hero = ({ heroData }: { heroData: any }) => {
  const { width } = useScreenSize();
  const retroFontSize = () => {
    if (width >= 600) {
      return 22;
    }

    if (width >= 375) {
      return 30;
    }

    if (width < 375) {
      return 25;
    }
    return 22;
  };
  return (
    <div className={styles.marketplaceHero}>
      <div className={classNames(styles.heroSection, styles.mobile)}>
        <CatchPhrase fontSize={retroFontSize()} />
      </div>
      <div className={classNames(styles.heroSection, styles.desktop)}>
        <span className={styles.heroTitle}>{heroData.title}</span>
        <span className={styles.heroSubtitle}>{heroData.subtitle}</span>
        <UniversalSearch />
      </div>
    </div>
  );
};

export default Hero;
