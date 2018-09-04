import React from 'react';
import { connect } from 'react-redux';
import Scorecard from './Scorecard';

const Leaderboard = ({ userIds }) => (
  <div className="leaderboard">
    <ul className="list">
      {userIds.map(uid => (
        <li key={uid}>
          <Scorecard id={uid} />
        </li>
      ))}
    </ul>
  </div>
);

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