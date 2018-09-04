import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {selectedUser: ''};

    this.handleUserSelection = this.handleUserSelection.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleUserSelection = (event) => {
    event.preventDefault();
    const selectedUser = event.target.value;
    this.setState({ selectedUser });
  }

  handleSignIn = (event) => {
    event.preventDefault();
    const { from } = this.props.location.state || {from: { pathname: '/' }};
    const { selectedUser } = this.state;
    this.props.dispatch(setAuthedUser(selectedUser));
    this.props.history.push(from.pathname);
  }

  render() {
    const { users, userIDs } = this.props;
    const { selectedUser } = this.state;

    return (
      <div className="form-container">
        <h3>Welcome to the Would You Rather App!</h3>
        <form onSubmit={this.handleSignIn}>
          <label>
            Select a user to impersonate:
          </label>
          <select value={selectedUser} onChange={this.handleUserSelection}>
            <option value="" disabled>Select user</option>
            {userIDs.map( id => (
              <option key={id} value={id}>{users[id].name}</option>
            ))}
          </select>
          <input className="submit-btn" type="submit" value="Sign In" disabled={selectedUser === ''}/>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    userIDs: Object.keys(users)
      .sort((a, b) => (users[a].name.toLowerCase() > users[b].name.toLowerCase() ) ? 1 : -1),
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Login);