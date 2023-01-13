import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './index.module.less';
import { getJewelrySearchSuggestions, logCommonView } from '@/lib/service';
import _ from 'lodash';
import { getSubcategoryValueToTextMap } from '@/shared/subcategory-helper';
import { SearchSuggestions } from '@/types/marketplace.interface';
import { convertSuggestions, imageTransform, shopAllLink } from '@/shared/utils';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { EventSource } from '@/shared/event-types';

const UniversalSearch = () => {
  const subcategoryValueMap = getSubcategoryValueToTextMap();
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestions>({});
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showSuggestionsContainer, setShowSuggestionsContainer] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const router = useRouter();

  const searchMarketplace = () => {
    setShowSearchOverlay(false);
    router.push(
      shopAllLink(searchQuery, {
        text: searchQuery,
        scrollToTop: true,
      }),
    );
    logCommonView(EventSource.SEARCH_TERMS, searchQuery);
  };

  const handleSuggestionClick = (search: boolean, text: string = null) => {
    if (search) {
      setSearchQuery(text);
      searchMarketplace();
    }
    closeMenu();
  };

  const closeMenu = () => {
    setSearchQuery('');
    setSearchSuggestions({});
    setShowSuggestionsContainer(false);
  };

  const suggestionShopAllLink = (item: any) => {
    return shopAllLink(item.text, {
      [item.param]: item.value,
    });
  };

  const hasSearchSuggestions = (obj: any) => {
    return Object.keys(obj).reduce((acc: boolean, key: any) => {
      return acc || !_.isEmpty(obj[key]);
    }, false);
  };

  const getSearchSuggestions = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.length) {
      setShowSuggestionsContainer(false);
      return;
    }

    try {
      const data = await getJewelrySearchSuggestions(value);
      const convertData = convertSuggestions(data, subcategoryValueMap);
      setSearchSuggestions(convertData);
      setShowSuggestionsContainer(hasSearchSuggestions(convertData));
    } catch (e) {}
  };

  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchButton} onClick={searchMarketplace}>
        <SearchOutlined />
      </span>
      <input
        className={styles.searchInput}
        placeholder="Search for a brand, category, person, or product"
        onChange={_.debounce(getSearchSuggestions, 500)}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            searchMarketplace();
          }
        }}
      />
      {showSuggestionsContainer && (
        <div className={styles.searchSuggestionsContainer}>
          {!_.isEmpty(searchSuggestions.categories) && (
            <div className={styles.wrapper}>
              <span className={classNames('utility-big', styles.header)}>Categories</span>
              {searchSuggestions.categories.map((category, index) => (
                <div key={`category-${index}`} className={styles.suggestion}>
                  <Link className={'utility-small'} href={suggestionShopAllLink(category)}>
                    {category.text}
                  </Link>
                </div>
              ))}
            </div>
          )}
          {!_.isEmpty(searchSuggestions.stores) && (
            <div className={styles.wrapper}>
              <span className={classNames('utility-big', styles.header)}>Creators</span>
              {searchSuggestions.stores.map((store, index) => (
                <div className={styles.suggestion} key={`store-${index}`}>
                  <Link className={styles.store} href={'/designers/' + store.handle}>
                    {store.avatarUrl && (
                      <img src={imageTransform(store.avatarUrl, 'compact')} alt="avatar" />
                    )}
                    <span className="utility-small">{store.title}</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {!_.isEmpty(searchSuggestions.items) && (
            <div className={styles.wrapper}>
              <span className={classNames('utility-big', styles.header)}>Items</span>
              {searchSuggestions.items.map((item, index) => (
                <div className={styles.suggestion} key={`item-${index}`}>
                  <span
                    className="utility-small"
                    onClick={() => handleSuggestionClick(true, item.text)}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;
