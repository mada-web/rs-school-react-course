import React, { RefObject } from 'react';

import css from './Select.module.css';

class Select extends React.Component<{
  refProp?: RefObject<HTMLSelectElement>;
  errors: {
    [key: string]: string;
  };
}> {
  labelText = 'Choose your favorite: ';

  render() {
    return (
      <div className={css.Wrapper}>
        <div className={css.SelectContainer}>
          <label htmlFor="technology" className={css.Label}>
            {this.labelText}
          </label>
          <select
            name="technology"
            id="technology"
            className={css.Select}
            ref={this.props.refProp}
            placeholder={'Choose...'}
          >
            <option value="Choose">Choose...</option>
            <option value="Vue">Vue</option>
            <option value="Angular">Angular</option>
            <option value="React">React</option>
            <option value="Next">Next</option>
            <option value="Express">Express</option>
            <option value="Nest">Nest</option>
          </select>
        </div>
        {this.props?.errors && this.props?.errors['technology'] && (
          <p className={css.Errors}>{this.props.errors['technology']}</p>
        )}
      </div>
    );
  }
}

export default Select;
