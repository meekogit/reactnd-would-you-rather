import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeAuthedUser as signOut } from '../actions/authedUser';

class AccountTools extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.dispatch(signOut());
    this.props.history.push('/login');
  }

  render() {
    const { avatarURL, name, isAuthenticated } = this.props.account;
    let avatar = avatarURL;
    if (isAuthenticated)
      avatar = require(`../utils/avatars/${avatarURL}`);
    return (
      <div>
        {isAuthenticated &&
          <div>
            <img
              src={avatar}
              alt={`Avatar of ${name}`}
              className="avatar"
            />
            <span>{name}</span>
            <button onClick={this.handleClick}>Sign out</button>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const { avatarURL='', name='' } = users[authedUser] || {};
  return {
    account: {
      name,
      avatarURL,
      isAuthenticated: authedUser !== null
    }
  }
}

export default withRouter(connect(mapStateToProps)(AccountTools));