import React, { FC } from 'react';

import { IUserCard } from 'types';

import css from './UserCard.module.css';

export const UserCard: FC<IUserCard> = ({ user }): JSX.Element => {
  return (
    <div className={css.CardContainer}>
      <div className={css.BlockWrapper}>
        <img src={user.photo} alt={`${user.username} photo`} className={css.Photo} />
      </div>
      <div className={css.UserMainInfo}>
        <div className={css.BlockWrapper}>
          <span>
            <b>Name: </b>
            {user.name}
          </span>
          <span>
            <b>Username: </b>
            {user.username}
          </span>
        </div>
        <div className={css.BlockWrapper}>
          <span>
            <b>Street: </b>
            {user.address.street}
          </span>
          <span>
            <b>Suite: </b>
            {user.address.suite}
          </span>
          <span>
            <b>City: </b>
            {user.address.city}
          </span>
          <span>
            <b>Zipcode: </b>
            {user.address.zipcode}
          </span>
        </div>

        <div className={css.BlockWrapper}>
          <span>
            <b>Phone: </b>
            {user.phone}
          </span>
          <span>
            <b>Website: </b>
            {user.website}
          </span>
        </div>
      </div>
    </div>
  );
};
