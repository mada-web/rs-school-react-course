import React from 'react';
import Container from '../../components/Container/Container';
import Form from '../../components/Form/Form';
import FormCard, { IFormCard } from '../../components/FormCard/FormCard';

type IFormsState = {
  cards: IFormCard[];
};

export class FormsPage extends React.Component<Record<string, never>, IFormsState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  getCard = (card: IFormCard) => {
    this.setState((prevState: IFormsState) => ({
      cards: [...prevState.cards, card],
    }));
  };

  render() {
    return (
      <Container>
        <Form getCard={this.getCard} />
        {this.state.cards.map((el) => (
          <FormCard key={el.id} card={el} />
        ))}
      </Container>
    );
  }
}

export default FormsPage;
