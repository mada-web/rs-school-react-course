import React, { FC } from 'react';

import errorIcon from '../../assets/error.svg';
import css from './Error.module.css';

export const Error: FC<{
  children: JSX.Element;
  onClose: () => void;
}> = ({ children, onClose }): JSX.Element => {
  return (
    <div className={css.Container}>
      <img src={errorIcon} alt="errorIcon" className={css.Icon} />
      <button className={css.Button} onClick={onClose} />
      {children}
    </div>
  );
};
