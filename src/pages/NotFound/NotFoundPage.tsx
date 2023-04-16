import React, { FC } from 'react';

import { Container } from '../../components/Container';
import cat from '../../assets/cat.png';

import css from './NotFound.module.css';

export const NotFoundPage: FC = () => {
  return (
    <Container>
      <div className={css.Wrapper}>
        <h1 className={css.Headline}>404</h1>
        <h2 className={css.ErrorText}>Oops! Something went wrong</h2>
        <img src={cat} alt="sad-cat-picture" className={css.Image} />
      </div>
    </Container>
  );
};
