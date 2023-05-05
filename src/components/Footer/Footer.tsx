import React, { FC } from 'react';

import css from './Footer.module.css';

export const Footer: FC = (): JSX.Element => {
  return (
    <div className={css.Footer}>
      <div className={css.Content}>
        <span>© 2023 Artsem Rubashka</span>
      </div>
    </div>
  );
};
