import React from 'react';

import css from './Select.module.css';

class Select extends React.Component {
  labelText = 'Choose your favorite: ';

  render() {
    return (
      <>
        <label htmlFor="technologies">
          {this.labelText}
          <select name="technologies" id="technologies" className={css.Select}>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
            <option value="react">React</option>
            <option value="next">Next</option>
            <option value="express">Express.JS</option>
            <option value="nest">Nest</option>
          </select>
        </label>
      </>
    );
  }
}

export default Select;
