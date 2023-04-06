import React from 'react';

import css from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={css.Container}>
      <div className={css.Loader}></div>
    </div>
  );
};
