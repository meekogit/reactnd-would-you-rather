import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountTools from './AccountTools';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
      </ul>
      <AccountTools />
    </nav>
  );
} 