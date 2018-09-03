import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';
import { Link } from 'react-router-dom';

const Question = ({ question, author }) => {
  const avatarURL = require(`../utils/avatars/${author.avatarURL}`);
  return (
    <div>
      <img
        src={avatarURL}
        alt={`Avatar of ${author.name}`}
        className="avatar"
      />
      <h3>{`${author.name} Asks:`}</h3>
      <span>{formatDate(question.timestamp)}</span>
      <p>{`Would you rather ${question.optionOne.text} or ${question.optionTwo.text}?`}</p>
      <Link
        to={`/questions/${question.id}`}
      >View Poll</Link>
    </div>
  );
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  return {
    question,
    author
  };
}

export default connect(mapStateToProps)(Question);