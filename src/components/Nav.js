import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AccountTools from './AccountTools';

class Nav extends Component {

  state = {
    toggleMenu: 'false'
  }

  handleClick = (e) => {
    this.setState({ toggleMenu: !this.state.toggleMenu })
  }

  render() {
    const { toggleMenu } = this.state;
    return (
      <nav>
        <button className="menu" onClick={this.handleClick}>
          <i className="fas fa-bars"></i>
        </button>
        <ul className={toggleMenu ? "nav-menu open" : "nav-menu close"}>
          <li>
            <NavLink to='/' exact activeClassName='active' onClick={this.handleClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active' onClick={this.handleClick}>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active' onClick={this.handleClick}>
              Leaderboard
            </NavLink>
          </li>
        </ul>
        <AccountTools />
      </nav>
    );
  }
}

export default Nav;
