import React from 'react';

export type IFormCard = {
  id: string;
  userName: string;
  bDay: string;
  agreement: string;
  rate: string;
  prefer: string;
  technologies: string;
  upload: string;
};

class FormCard extends React.Component<{ card: IFormCard }> {
  render() {
    return (
      <div>
        <p>{this.props.card.userName}</p>
        <p>{this.props.card.bDay}</p>
        <p>{this.props.card.agreement}</p>
        <p>{this.props.card.rate}</p>
        <p>{this.props.card.prefer}</p>
        <p>{this.props.card.technologies}</p>
        <img src={this.props.card.upload} alt="userImage" />
      </div>
    );
  }
}

export default FormCard;
