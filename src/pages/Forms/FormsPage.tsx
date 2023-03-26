import React from 'react';
import Container from '../../components/Container/Container';
import Form from '../../components/Form/Form';
import FormCard, { IFormCard } from '../../components/FormCard/FormCard';

import css from './FormsPage.module.css';
import Popup from '../../components/PopUp/PopUp';

type IFormsState = {
  cards: IFormCard[];
  isOpen: boolean;
};

export class FormsPage extends React.Component<Record<string, never>, IFormsState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      cards: [],
      isOpen: false,
    };
  }

  getCard = (card: IFormCard) => {
    this.setState((prevState: IFormsState) => ({
      cards: [...prevState.cards, card],
    }));
  };

  setIsOpen = (value: boolean) => {
    this.setState({ isOpen: value });
  };

  render() {
    return (
      <Container>
        <div className={css.ContentWrapper}>
          <Form getCard={this.getCard} setIsOpen={this.setIsOpen} />
          <section className={css.CardsContainer}>
            {this.state.cards.map((el) => (
              <FormCard key={el.id} card={el} />
            ))}
          </section>
        </div>
        {this.state.isOpen && <Popup setIsOpen={this.setIsOpen} isOpen={this.state.isOpen} />}
      </Container>
    );
  }
}

export default FormsPage;
