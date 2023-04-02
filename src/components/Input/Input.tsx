import React, { RefObject } from 'react';

import css from './Input.module.css';

export interface IInput {
  id: string;
  type: string;
  name: string;
  value?: string;
  label?: string;
  accept?: string;
  placeholder?: string;
  defaultValue?: number;
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  refProp?: RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: {
    [key: string]: string;
  };
}

class Input extends React.Component<IInput> {
  render() {
    return (
      <div className={css.InputContainer}>
        <div className={this.props.wrapperClassName}>
          <label htmlFor={this.props.id} className={this.props.labelClassName}>
            {this.props.label}
          </label>
          <input
            id={this.props.id}
            ref={this.props.refProp}
            name={this.props.name}
            accept={this.props.accept}
            type={this.props.type}
            value={this.props.value}
            className={this.props.className}
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onChange={(event) => this.props.onChange && this.props.onChange(event)}
          />
        </div>
        {this.props?.errors && this.props?.errors[this.props.name] && (
          <p className={css.Errors}>{this.props.errors[this.props.name]}</p>
        )}
      </div>
    );
  }
}

export default Input;
