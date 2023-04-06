import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: FC<ModalProps> = ({ onClose, children }): JSX.Element => {
  return createPortal(
    <div className={css.ModalWrapper}>
      <div className={css.ModalOverlay} onClick={onClose} />
      <div className={css.ModalContent} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};
