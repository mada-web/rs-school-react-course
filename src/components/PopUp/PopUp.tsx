import React from 'react';

import css from './PopUp.module.css';

type IPopupState = {
  isOpen: boolean;
};
type IPopUpProps = {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
};

class Popup extends React.Component<IPopUpProps, IPopupState> {
  componentDidMount() {
    setTimeout(() => {
      this.props.setIsOpen(false);
    }, 5000);
  }

  render() {
    return (
      <div>
        {this.props.isOpen && (
          <div className={css.Popup}>
            <div className={css.PopupContent}>
              <h2>CARD HAS BEEN CREATED</h2>
              <p>Your data successfully saved</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Popup;
