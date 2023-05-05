import React, { FC, useState } from 'react';

import { IFormCard } from '../../types';
import { Form } from '../../components/Form';
import { Popup } from '../../components/PopUp';
import { FormCard } from '../../components/FormCard';
import { Container } from '../../components/Container';

import { addFormCard } from '../../store/reducers/formSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import css from './FormPage.module.css';

export const FormPage: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { cards } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const getCard = (card: IFormCard) => {
    dispatch(addFormCard(card));
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
