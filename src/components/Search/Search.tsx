import React, { FC, useEffect, useState } from 'react';

import css from './Seacrh.module.css';

export const Search: FC = () => {
  const [input, setInput] = useState<string>(
    JSON.parse(localStorage.getItem('inputValue') as string) ?? ''
  );

  useEffect(() => {
    return () => {
      localStorage.setItem('inputValue', JSON.stringify(input));
    };
  });

  const getInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  return (
    <div className={css.SearchWrapper}>
      <input
        id="search"
        name="search"
        type="text"
        value={input}
        className={css.Input}
        placeholder="Search..."
        onChange={(event) => getInputValue(event)}
      />
    </div>
  );
};
