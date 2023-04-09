import React, { FC } from 'react';

import { Container } from '../../components/Container';
import { Search } from '../../components/Search';
import { UserCard, users } from '../../components/UserCard';
import { IUser } from '../../types';

import css from './MainPage.module.css';

export const MainPage: FC = () => {
  return (
    <Container>
      <div className={css.Wrapper}>
        <Search />
        <div className={css.CardsContainer}>
          {users.map((user: IUser) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </Container>
  );
};
