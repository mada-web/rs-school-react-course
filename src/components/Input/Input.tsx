import React from 'react';

import css from './Input.module.css';

export interface IInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class Input extends React.Component<IInput> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={(event) => this.props.onChange(event)}
        placeholder="Search..."
        className={css.Input}
      />
    );
  }
}

export default Input;
