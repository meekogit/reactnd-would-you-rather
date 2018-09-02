import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    const { question, author } = this.props;
    const avatarURL = require(`../utils/avatars/${author.avatarURL}`)

    return (
      <li key={question.id}>
        <h3>{`${author.name} Asks:`}</h3>
        <img
          src={avatarURL}
          alt={`Avatar of ${author.name}`}
          className="avatar"
        />
        <p>{`Would you rather ${question.optionOne.text} or ${question.optionTwo.text}?`}</p>
        <a href="#">View Poll</a>
      </li>
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