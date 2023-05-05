import React, { FC } from 'react';

import css from './Spinner.module.css';

export const Spinner: FC = (): JSX.Element => {
  return (
    <div className={css.SpinnerContainer}>
      <div className={css.Spinner} />
    </div>
  );
};
