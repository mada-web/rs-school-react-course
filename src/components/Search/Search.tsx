import React, { FC, useEffect, useRef, useState } from 'react';

import css from './Seacrh.module.css';

type ISearch = {
  handleSearch: () => Promise<void>;
  setInputValue: (value: string) => void;
};

export const Search: FC<ISearch> = ({ setInputValue, handleSearch }) => {
  const [input, setInput] = useState<string>(localStorage.getItem('inputValue') ?? '');
  const searchRef = useRef(input);

  useEffect(() => {
    searchRef.current = input;
  }, [input]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.code === 'Enter') {
      await handleSearch();

      localStorage.setItem('inputValue', searchRef.current);

      setInputValue(input);
    }
  };

  return (
    <div className={css.SearchWrapper}>
      <input
        id="search"
        name="search"
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={css.Input}
        placeholder="Search..."
      />
    </div>
  );
};
