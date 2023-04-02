import React from 'react';

import css from './FormCard.module.css';

export type IFormCard = {
  id: string;
  userName: string;
  birthDate: string;
  agreement: string;
  rating: string | number;
  preferences: string;
  technology: string;
  fileURL: string;
};

class FormCard extends React.Component<{ card: IFormCard }> {
  render() {
    return (
      <div className={css.Container}>
        <span className={css.Info}>
          <b>Name:</b> {this.props.card.userName}
        </span>
        <span className={css.Info}>
          <b>Date of birth:</b> {this.props.card.birthDate}
        </span>
        <span className={css.Info}>
          <b>Agreement:</b> {this.props.card.agreement}
        </span>
        <span className={css.Info}>
          <b>Form Rating:</b> {this.props.card.rating} %
        </span>
        <span className={css.Info}>
          <b>Prefer:</b> {this.props.card.preferences}
        </span>
        <span className={css.Info}>
          <b>Favorite technology:</b> {this.props.card.technology}
        </span>
        <div className={css.ImageWrapper}>
          <img src={this.props.card.fileURL} alt="uploadedImage" className={css.Image} />
        </div>
      </div>
    );
  }
}

export default FormCard;
