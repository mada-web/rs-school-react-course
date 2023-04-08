import React, { FC } from 'react';
import { Header } from '../Header/';

import { Footer } from '../Footer';

import css from './Container.module.css';

interface IContainer {
  children: React.ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  return (
    <div className={css.Container}>
      <Header />
      <main className={css.Content}>{children}</main>
      <Footer />
    </div>
  );
};
