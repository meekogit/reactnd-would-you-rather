import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';

class Question extends Component {
  render() {
    const { question, author } = this.props;
    const avatarURL = require(`../utils/avatars/${author.avatarURL}`)

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
        <a href="#">View Poll</a>
      </div>
    );
  }
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