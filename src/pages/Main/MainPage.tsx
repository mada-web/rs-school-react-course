import React from 'react';

import Input from '../../components/Input/Input';
import UserCard from '../../components/UserCard/UserCard';
import Container from '../../components/Container/Container';
import { IUser } from '../../types/common.types';

import css from './MainPage.module.css';

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

  getInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ input: event.target.value });
  };

  render() {
    return (
      <Container>
        <div className={css.Wrapper}>
          <Input
            id="search"
            name="search"
            type="text"
            value={this.state.input ?? ''}
            onChange={this.getInputValue}
            className={css.Input}
            placeholder="Search..."
            wrapperClassName={css.InputWrapper}
          />
          <div className={css.CardsContainer}>
            {this.props.users.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

export default MainPage;
