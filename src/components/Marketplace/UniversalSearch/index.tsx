import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.module.less';

const UniversalSearch = () => {
  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchButton}>
        <SearchOutlined />
      </span>
    </div>
  );
};

export default UniversalSearch;
