import React, { FC, useEffect } from 'react';

import css from './PopUp.module.css';

type IPopUpProps = {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
};

export const Popup: FC<IPopUpProps> = ({ setIsOpen, isOpen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div>
      {isOpen && (
        <div className={css.Popup}>
          <div className={css.PopupContent}>
            <h2>CARD HAS BEEN CREATED</h2>
            <p>Your data successfully saved</p>
          </div>
        </div>
      )}
    </div>
  );
};
