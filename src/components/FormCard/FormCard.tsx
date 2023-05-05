import React, { FC } from 'react';

import { IFormCard } from 'types';

import css from './FormCard.module.css';

export const FormCard: FC<{ card: IFormCard }> = ({ card }): JSX.Element => {
  return (
    <div className={css.Container}>
      <span className={css.Info}>
        <b>Name:</b> {card.userName}
      </span>
      <span className={css.Info}>
        <b>Date of birth:</b> {card.birthDate}
      </span>
      <span className={css.Info}>
        <b>Prefer:</b> {card.preferences}
      </span>
      <span className={css.Info}>
        <b>Favorite technology:</b> {card.technology}
      </span>
      <div className={css.ImageWrapper}>
        <img src={card.fileURL} alt="uploadedImage" className={css.Image} />
      </div>
    </div>
  );
};
