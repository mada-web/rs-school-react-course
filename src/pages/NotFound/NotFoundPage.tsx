import React from 'react';

import Container from '../../components/Container/Container';
import cat from '../../assets/cat.png';

import css from './NotFound.module.css';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Container>
        <div className={css.Wrapper}>
          <h1 className={css.Headline}>404</h1>
          <h2 className={css.ErrorText}>Oops! Something went wrong</h2>
          <img src={cat} alt="sad-cat-picture" />
        </div>
      </Container>
    );
  }
}

export default NotFoundPage;
