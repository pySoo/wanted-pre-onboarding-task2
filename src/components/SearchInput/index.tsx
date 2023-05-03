import SearchIcon from '../SearchIcon';
import { BiSearch } from 'react-icons/bi';
import styles from './styles.module.scss';
import { useRef } from 'react';

type AddTodoInputProps = {
  searchTerm: string;
  isFocused: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFocused: () => void;
};

export default function SearchInput({
  searchTerm,
  isFocused,
  handleChange,
  handleSubmit,
  handleFocused,
}: AddTodoInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const setFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputContainer}>
        {!isFocused && !searchTerm && (
          <div onClick={setFocusInput} className={styles.placeholder}>
            <SearchIcon />
            <span>질환명을 입력해 주세요.</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          onChange={handleChange}
          onFocus={handleFocused}
          onBlur={handleFocused}
        />
        <button className={styles.searchButton} type="submit">
          <BiSearch className={styles.searchIcon} fill="#fff" size={30} />
        </button>
      </div>
    </form>
  );
}
