import React from 'react';
import { connect } from 'react-redux';

const Scorecard = ({ user }) => {
  const { name, avatarURL, answers, questions } = user;
  const avatar = require(`../utils/avatars/${avatarURL}`);

  return (
    <div>
      <h3>{name}</h3>
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className="avatar"
      />
      <p>{`Questions answered = ${answers}`}</p>
      <p>{`Questions created = ${questions}`}</p>
      <p>{`Score = ${answers + questions}`}</p>
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