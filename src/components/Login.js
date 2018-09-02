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
    const { selectedUser } = this.state;
    this.props.dispatch(setAuthedUser(selectedUser));
  }

  render() {
    const { users, userIDs } = this.props
    const { selectedUser } = this.state
    return (
      <div>
        <h3>Welcome to the Would You Rather App!</h3>
        <form onSubmit={this.handleSignIn}>
          <label>
            Select a user to impersonate:
            <select value={selectedUser} onChange={this.handleUserSelection}>
              {userIDs.map( id => (
                <option key={id} value={id}>{users[id].name}</option>
              ))}
            </select>
          </label>
          <input type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIDs: Object.keys(users)
      .sort((a, b) => (users[a].name.toLowerCase() > users[b].name.toLowerCase() ) ? 1 : -1),
    users
  }
}

export default connect(mapStateToProps)(Login);