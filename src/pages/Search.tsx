import React from 'react';
import SearchBar from '@/components/SearchBar';
import styles from './styles.module.scss';

export default function Main() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.searchContainer}>
        <h2>{`국내 모든 임상시험 검색하고 \n 온라인으로 참여하기`}</h2>
        <SearchBar />
      </div>
    </div>
  );
}
