import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import styles from './index.module.less';
import { EventSource } from '@/shared/event-types';
import useBusinessSettingsDisplay from '@/lib/hooks/common/useBusinessSettingsDisplay';
import FeaturedCreator from '@/components/Marketplace/FeaturedCreator';
import { FeaturedCreatorProductType, FeaturedCreatorType } from '@/types/marketplace.interface';
import PopularProducts from '@/components/Shop/PopularProducts';
import _ from 'lodash';
import { getAllJewelry } from '@/lib/service';
import { formatProducts, groupById } from '@/shared/marketplace';

const Home = ({ isMobile }: { isMobile: boolean }) => {
  const [featuredCreatorProducts, setFeaturedCreatorProducts] = useState<
    FeaturedCreatorProductType[]
  >([]);

  const { value: creators } = useBusinessSettingsDisplay('FEATURED_CREATORS');
  const { value: products } = useBusinessSettingsDisplay('FEATURED_PRODUCTS');

  const featuredCreators = creators?.value || new Array(5).fill({});

  useEffect(() => {
    const productList: FeaturedCreatorProductType[] = products?.value || [];
    if (!_.isEmpty(productList)) {
      getAllJewelry({
        jewelryIds: productList.map((item) => item.productId),
        size: productList.length,
        isFetchStoreList: false,
      }).then((data) => {
        setFeaturedCreatorProducts(
          formatProducts(productList, groupById(data.list as any as FeaturedCreatorProductType[])),
        );
      });
    }
  }, [products]);

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
          <PopularProducts
            products={featuredCreatorProducts}
            numbered={true}
            vertical={true}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
