import React, { RefObject } from 'react';

export interface IInput {
  id: string;
  ref?: RefObject<HTMLInputElement>;
  min?: string;
  max?: string;
  type: string;
  name: string;
  value?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  labelClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class Input extends React.Component<IInput> {
  render() {
    return (
      <>
        <label htmlFor={this.props.id} className={this.props.labelClassName}>
          {this.props.label}
          <input
            id={this.props.id}
            ref={this.props.ref}
            name={this.props.name}
            type={this.props.type}
            value={this.props.value}
            className={this.props.className}
            placeholder={this.props.placeholder}
            onChange={(event) => this.props.onChange && this.props.onChange(event)}
          />
        </label>
      </>
    );
  }
}

export default Input;
