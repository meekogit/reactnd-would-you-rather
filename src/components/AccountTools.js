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
    let component = null;
    if (isAuthenticated) {
      avatar = require(`../utils/avatars/${avatarURL}`);
      component = <div className="account-tools"> 
                    <div className="account-details">
                      <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className="round-avatar"
                      />
                    </div>
                    <span>{name}</span>
                    <button
                      className="signout-btn" 
                      onClick={this.handleClick}
                    >
                      Sign out
                    </button>
                  </div>
    }

    return (component);
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