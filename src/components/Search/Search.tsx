import React, { FC, useEffect, useRef, useState } from 'react';

import { setSearchQuery } from '../../store/reducers/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import css from './Seacrh.module.css';

type ISearch = {
  handleSearch: () => void;
};

export const Search: FC<ISearch> = ({ handleSearch }): JSX.Element => {
  const [input, setInput] = useState<string>('');

  const searchRef = useRef(input);
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.search);

  useEffect(() => {
    searchRef.current = input;
  }, [input]);

  useEffect(() => {
    setInput(query);
  }, [query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleSearch();

      dispatch(setSearchQuery(searchRef.current));
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
