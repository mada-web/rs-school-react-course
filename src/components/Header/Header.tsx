import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './Header.module.css';
import navLinks from '../../constants/navigation.constant';

class Header extends React.Component {
  render() {
    return (
      <header className={css.Header}>
        <nav>
          {navLinks.map((el) => (
            <NavLink
              key={el.id}
              to={el.to}
              className={({ isActive }) =>
                isActive ? `${css.activeNavLink} ${css.NavLink}` : css.NavLink
              }
            >
              {el.name}
            </NavLink>
          ))}
        </nav>
      </header>
    );
  }
}

export default Header;
