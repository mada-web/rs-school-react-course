import React from 'react';

import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import { IUser } from '../../types/common.types';

import css from './MainPage.module.css';
import Card from '../../components/Card/Card';

type IMainPageProps = {
  users: IUser[];
};

type IMainPageState = {
  input: string;
};

class MainPage extends React.Component<IMainPageProps, IMainPageState> {
  constructor(props: IMainPageProps) {
    super(props);

    this.state = {
      input: JSON.parse(localStorage.getItem('inputValue') as string),
    };
  }

  componentWillUnmount(): void {
    localStorage.setItem('inputValue', JSON.stringify(this.state.input));
  }

  getInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  render() {
    return (
      <Container>
        <div className={css.Wrapper}>
          <Input value={this.state.input} onChange={this.getInputValue} />
          <div className={css.CardsContainer}>
            {this.props.users.map((user) => (
              <Card user={user} key={user.id} />
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

export default MainPage;
