import React from 'react';
import Header from '../Header/Header';
import css from './Container.module.css';

interface MyProps {
  children: React.ReactNode;
}

class Container extends React.Component<MyProps> {
  render() {
    return (
      <div className={css.Container}>
        <Header />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Container;
