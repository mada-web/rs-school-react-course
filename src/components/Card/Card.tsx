import React from 'react';
import { IUser } from '../../types/common.types';

import css from './Card.module.css';

class Card extends React.Component<{ user: IUser }> {
  render() {
    return (
      <div className={css.CardContainer}>
        <div className={css.BlockWrapper}>
          <img
            src={this.props.user.photo}
            alt={`${this.props.user.username} photo`}
            className={css.Photo}
          />
        </div>
        <div className={css.UserMainInfo}>
          <div className={css.BlockWrapper}>
            <span>
              <b>Name: </b>
              {this.props.user.name}
            </span>
            <span>
              <b>Username: </b>
              {this.props.user.username}
            </span>
          </div>
          <div className={css.BlockWrapper}>
            <span>
              <b>Street: </b>
              {this.props.user.address.street}
            </span>
            <span>
              <b>Suite: </b>
              {this.props.user.address.suite}
            </span>
            <span>
              <b>City: </b>
              {this.props.user.address.city}
            </span>
            <span>
              <b>Zipcode: </b>
              {this.props.user.address.zipcode}
            </span>
          </div>

          <div className={css.BlockWrapper}>
            <span>
              <b>Phone: </b>
              {this.props.user.phone}
            </span>
            <span>
              <b>Website: </b>
              {this.props.user.website}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
