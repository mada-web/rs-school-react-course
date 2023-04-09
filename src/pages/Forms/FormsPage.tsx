import React, { FC, useState } from 'react';

import { IFormCard } from '../../types';
import { Container } from '../../components/Container';
import { Form } from '../../components/Form';
import { FormCard } from '../../components/FormCard';
import { Popup } from '../../components/PopUp';

import css from './FormsPage.module.css';

export const FormsPage: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cards, setCards] = useState<IFormCard[]>([]);

  const getCard = (card: IFormCard) => {
    setCards((prevState: IFormCard[]) => [...prevState, card]);
  };

  return (
    <Container>
      <div className={css.ContentWrapper}>
        <Form getCard={getCard} setIsOpen={setIsOpen} />
        <section className={css.CardsContainer}>
          {cards.map((el) => (
            <FormCard key={el.id} card={el} />
          ))}
        </section>
      </div>
      {isOpen && <Popup setIsOpen={setIsOpen} isOpen={isOpen} />}
    </Container>
  );
};
