import React from 'react';
import Hero from './Hero';
import styles from './index.module.less';
import { EventSource } from '@/shared/event-types';
import useBusinessSettingsDisplay from '@/lib/hooks/common/useBusinessSettingsDisplay';
import FeaturedCreator from '@/components/Marketplace/FeaturedCreator';
import { FeaturedCreatorType } from '@/types/marketplace';
import PopularProducts from '@/components/Shop/PopularProducts';

const Home = ({ isMobile }: { isMobile: boolean }) => {
  const { value: creators } = useBusinessSettingsDisplay('FEATURED_CREATORS');

  const featuredCreators = creators?.value || new Array(5).fill({});

  return (
    <div className={styles.marketplace}>
      <Hero isMobile={isMobile} />

      <div className={styles.marketplaceBody}>
        <div className={styles.featuredCreatorsContainer}>
          {featuredCreators.map((creator: FeaturedCreatorType, i: number) => (
            <FeaturedCreator
              key={`featured-creator-${i}`}
              isMobile={isMobile}
              creator={creator}
              originEventName={EventSource.MARKETPLACE_HOMEPAGE_CONTENT}
            />
          ))}
        </div>
        <div className={styles.featuredProductsContainer}>
          <PopularProducts products={[]} numbered={true} vertical={true} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

export default Home;
