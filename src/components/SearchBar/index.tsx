import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { searchAPI } from '@/services/search';
import SearchInput from '../SearchInput';
import SearchResultList from '../SearchResultList.tsx';
import { debounce } from 'lodash';
import styles from './styles.module.scss';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const getSearchAPI = async (searchTerm: string) => {
    if (searchTerm) {
      const response: SearchResultType[] = await searchAPI(searchTerm);
      if (response) {
        setSearchResults(response);
      }
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(term => {
        getSearchAPI(term);
      }, 500),
    [searchTerm],
  );

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getSearchAPI(searchTerm);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleFocused = () => {
    setIsFocused(prev => !prev);
  };

  return (
    <div className={styles.searchBarContainer}>
      <SearchInput
        searchTerm={searchTerm}
        isFocused={isFocused}
        handleChange={handleInputChange}
        handleSubmit={handleInputSubmit}
        handleFocused={handleFocused}
      />
      {isFocused && <SearchResultList searchTerm={searchTerm} searchResults={searchResults} />}
    </div>
  );
}
