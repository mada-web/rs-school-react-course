import React from 'react';
import css from './Input.module.css';

interface MyProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

class Input extends React.Component<MyProps> {
  render() {
    return (
      <input
        type={this.props.type}
        value={this.props.value}
        onChange={(event) => this.props.onChange(event)}
        placeholder={this.props.placeholder}
        className={css.Input}
      />
    );
  }
}

export default Input;
