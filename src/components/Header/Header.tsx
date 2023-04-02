import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './Header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={css.Header}>
        <nav>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? `${css.activeNavLink} ${css.NavLink}` : css.NavLink
            }
          >
            Main
          </NavLink>
          <NavLink
            to={'/about'}
            className={({ isActive }) =>
              isActive ? `${css.activeNavLink} ${css.NavLink}` : css.NavLink
            }
          >
            About Us
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
