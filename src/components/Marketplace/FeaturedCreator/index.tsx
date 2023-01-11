import React from 'react';
import { FeaturedCreatorType } from '@/types/marketplace.interface';
import { EventSource } from '@/shared/event-types';
import styles from './index.module.less';
import Link from 'next/link';
import { imgix } from '@/shared/utils';
import { getTagColor } from '@/shared/marketplace';
import _ from 'lodash';
import { Skeleton } from 'antd';
import { useConfigProvider } from '@/context/ConfigProvider';

const FeaturedCreator = ({
  creator,
  originEventName,
}: {
  creator: FeaturedCreatorType;
  originEventName: EventSource;
}) => {
  const { isMobile } = useConfigProvider();

  const logClick = () => {
    // TODO
  };

  if (_.isEmpty(creator)) {
    return (
      <div className={styles.featuredCreator}>
        <div className={styles.imageContainer}>
          <Skeleton.Image active />
        </div>
        <div className={styles.contentContainer}>
          <Skeleton active />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.featuredCreator}>
      <div className={styles.imageContainer}>
        <Link
          className={styles.imageLink}
          href={`/designers/${creator.storeHandle}`}
          onClick={logClick}
        >
          <img
            src={imgix(creator.imageUrl, { h: isMobile ? 250 : 400, dpr: 2, q: 75 })}
            alt={`View products by ${creator.title}`}
            title={`View products by ${creator.title}`}
          />
        </Link>
      </div>
      <div className={styles.contentContainer}>
        <Link
          href={`/designers/${creator.storeHandle}`}
          className={styles.title}
          onClick={logClick}
        >
          {creator.title}
        </Link>
        <span className={styles.description}>{creator.description}</span>
        <div className={styles.tags}>
          {creator.tags.map((tag, i) => (
            <span
              className={styles.tag}
              key={`tag-${i}`}
              style={{ backgroundColor: getTagColor(tag) }}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/designers/${creator.storeHandle}`}
          className={styles.goToShop}
          onClick={logClick}
        >
          <span>View Creator Page</span>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCreator;
