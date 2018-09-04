import React from 'react';
import { connect } from 'react-redux';

const Scorecard = ({ user }) => {
  const { name, avatarURL, answers, questions } = user;
  const avatar = require(`../utils/avatars/${avatarURL}`);

  return (
    <div className="card scorecard">
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className="avatar"
      />
      <h3>{name}</h3>
      <div className="partial-score">
        <p>{`Questions answered ${answers}`}</p>
        <hr></hr>
        <p>{`Questions created ${questions}`}</p>
      </div>
      <div className="score">
        <p>Score</p>
        <div>
          {answers + questions}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ users }, { id }) {
  const { name, avatarURL, answers, questions } = users[id];
  return {
    user: {
      name,
      avatarURL,
      answers: Object.keys(answers).length,
      questions: questions.length
    }
  }
}

export default connect(mapStateToProps)(Scorecard);