import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './index.module.less';

const UniversalSearch = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showSuggestionsContainer, setShowSuggestionsContainer] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchMarketplace = () => {
    setShowSearchOverlay(false);
    //TODO logNavLinkClick(searchQuery)
    //logNavLinkClick(searchQuery)
    // this.$router.push({
    //   path: this.shopAllLink(searchQuery, {
    //     text: searchQuery,
    //     scrollToTop: true,
    //   }),
    // });
  };

  const getSearchSuggestions = () => {
    setShowSuggestionsContainer(true);
    // TODO
  };

  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchButton} onClick={searchMarketplace}>
        <SearchOutlined />
      </span>
      <input
        className={styles.searchInput}
        value={searchQuery}
        placeholder="Search for a brand, category, person, or product"
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            searchMarketplace();
          }
        }}
        onInput={getSearchSuggestions}
      />
    </div>
  );
};

export default UniversalSearch;
