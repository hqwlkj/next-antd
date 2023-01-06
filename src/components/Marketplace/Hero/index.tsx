import React from 'react';
import CatchPhrase from '@/components/Marketplace/CatchPhrase';
import useScreenSize from '@/lib/hooks/utils/useScreenSize';
import styles from './index.module.less';
import classNames from 'classnames';
import UniversalSearch from '@/components/Marketplace/UniversalSearch';
import useBusinessSettingsDisplay from '@/lib/hooks/common/useBusinessSettingsDisplay';
import { SearchTerm } from '@/types/marketplace';
import { createShopAllQueryString } from '@/shared/marketplace';
import Link from 'next/link';

const Hero = ({ isMobile }: { isMobile: boolean }) => {
  const { value: heroValue } = useBusinessSettingsDisplay('MARKETPLACE');
  const { value: termsValue } = useBusinessSettingsDisplay('MARKETPLACE_SEARCH_TERMS');
  const heroData = heroValue?.value || {};

  const formatSearchTerms = (searchTerms: SearchTerm[]) => {
    return searchTerms.map((term) => {
      return {
        text: term.text,
        path: createShopAllQueryString(term.categories.join(','), term.storeIds),
      };
    });
  };

  const searchTerms = formatSearchTerms(termsValue?.value || []);

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

  const logItemClick = (keys: string) => {
    // TODO
    // this.$api.loggingService.logCommonView(
    //   keys ? EventSource.MARKETPLACE_HOMEPAGE_SEARCH_TERM : EventSource.MARKETPLACE_HOMEPAGE_FEATURED_IMAGES,
    //   keys,
    //   this.$gtm
    // )
  };
  return (
    <div className={styles.marketplaceHero}>
      {isMobile ? (
        <div className={classNames(styles.heroSection, styles.mobile)}>
          <CatchPhrase fontSize={retroFontSize()} />
        </div>
      ) : (
        <div className={classNames(styles.heroSection, styles.desktop)}>
          <span className={styles.heroTitle}>{heroData.title}</span>
          <span className={styles.heroSubtitle}>{heroData.subtitle}</span>
          <UniversalSearch />
          <div className={styles.heroSearchTerms}>
            {searchTerms.map((term, index) => (
              <Link
                v-for="term in searchTerms"
                key={index}
                href={term.path}
                className={styles.heroSearchTerm}
                onClick={() => logItemClick(term.text)}
              >
                {term.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
