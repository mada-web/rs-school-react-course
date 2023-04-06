import React, { FC, useEffect, useRef, useState } from 'react';

import css from './Seacrh.module.css';
import { IMovie } from 'types';
import { api_key, baseURL } from '../../constants';

type ISearch = {
  setSearchResults: (data: IMovie[]) => void;
};

export const Search: FC<ISearch> = ({ setSearchResults }) => {
  const [inputValue, setInputValue] = useState<string>(
    JSON.parse(localStorage.getItem('inputValue') ?? '')
  );

  const searchRef = useRef(inputValue);

  const handleSearch = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${baseURL}search/movie?api_key=${api_key}&language=en-US&query=${inputValue}&include_adult=false`
      );

      const searchResult = await response.json();

      setSearchResults(searchResult.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchRef.current = inputValue;
  }, [inputValue]);

  useEffect(() => {
    if (inputValue) {
      handleSearch();
    }

    return () => {
      localStorage.setItem('inputValue', JSON.stringify(searchRef.current));
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.code === 'Enter') {
      await handleSearch();
      localStorage.setItem('inputValue', JSON.stringify(searchRef.current));
    }
  };

  return (
    <div className={css.SearchWrapper}>
      <input
        id="search"
        name="search"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={css.Input}
        placeholder="Search..."
      />
    </div>
  );
};
