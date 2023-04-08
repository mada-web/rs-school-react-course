import React from 'react';

import css from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={css.SpinnerContainer}>
      <div className={css.Spinner} />
    </div>
  );
};
