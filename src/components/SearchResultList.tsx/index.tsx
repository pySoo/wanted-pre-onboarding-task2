import { useEffect, useRef, useState } from 'react';
import SearchIcon from '../SearchIcon';
import styles from './styles.module.scss';

type SearchTermListProps = {
  searchTerm: string;
  searchResults: SearchResultType[];
};

export default function SearchResultList({ searchTerm, searchResults }: SearchTermListProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const searchResultRef = useRef<SearchResultType[]>(searchResults);

  const handleKeyDown = (e: KeyboardEvent) => {
    const currentData = searchResultRef.current;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(currentIndex =>
        currentIndex === currentData.length - 1 ? currentIndex : currentIndex + 1,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(currentIndex => (currentIndex === -1 ? -1 : currentIndex - 1));
    }
  };

  useEffect(() => {
    searchResultRef.current = searchResults;
  }, [searchResults]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.listContainer}>
      <div className={styles.resultContainer}>
        {!searchTerm ? (
          <div className={styles.recentContainer}>
            <h1>최근 검색어</h1>
            <span>최근 검색어가 없습니다</span>
          </div>
        ) : (
          <div className={styles.resultList}>
            <div className={styles.suggestionItem}>
              <SearchIcon />
              <span className={styles.boldText}>{searchTerm}</span>
            </div>
            {searchResults.length !== 0 && <span className={styles.resultTitle}>추천 검색어</span>}
            <ul>
              {searchResults.map((searchTerm, index) => (
                <li
                  key={searchTerm.id}
                  className={index === activeIndex ? styles.activeResultItem : styles.resultItem}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <SearchIcon />
                  <span>{searchTerm.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
