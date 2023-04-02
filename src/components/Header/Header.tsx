import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import navLinks from './Header.constants';

import css from './Header.module.css';

export const Header: FC = () => {
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
};
