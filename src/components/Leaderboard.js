import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scorecard from './Scorecard';

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <ul>
          {this.props.userIds.map(uid => (
            <li key={uid}>
              <Scorecard id={uid} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  
  const userIds = Object.keys(users)
    .sort((a, b) => {
      const totalA = Object.keys(users[a].answers).length + users[a].questions.length;
      const totalB = Object.keys(users[b].answers).length + users[b].questions.length;
      return totalB - totalA;
    }
  );

  return {
    userIds
  };
}

export default connect(mapStateToProps)(Leaderboard);