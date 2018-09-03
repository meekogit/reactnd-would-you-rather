import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnsweredQuestion extends Component {
  render() {
    const { author, question, userAnswer } = this.props;
    const avatarURL = require(`../utils/avatars/${author.avatarURL}`);
    const { optionOne, optionTwo, totalVotes } = question;
    return (
      <div>
        <img
          src={avatarURL}
          alt={`Avatar of ${author.name}`}
          className="avatar"
        />
        <h3>{`Asked by ${author.name}:`}</h3>
        <div>
          {userAnswer === 'optionOne' && <span>Your answer</span>}
          <p>{`Would you rather ${optionOne.text}?`}</p>
          <p>{`${optionOne.votes*100/totalVotes}%`}</p>
          <p>{`${optionOne.votes} of ${totalVotes} votes`}</p>
        </div>
        <div>
          {userAnswer === 'optionTwo' && <span>Your answer</span>}
          <p>{`Would you rather ${optionTwo.text}?`}</p>
          <p>{`${optionTwo.votes*100/totalVotes}%`}</p>
          <p>{`${optionTwo.votes} of ${totalVotes} votes`}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser, questions }, { id }) {
  const { optionOne, optionTwo, author } = questions[id];
  const userAnswer = users[authedUser].answers[id];
  const { name, avatarURL } = users[author];
  
  return {
    author: { name, avatarURL },
    question: {
      totalVotes: optionOne.votes.length + optionTwo.votes.length,
      optionOne: {
        text: optionOne.text,
        votes: optionOne.votes.length
      },
      optionTwo: {
        text: optionTwo.text,
        votes: optionTwo.votes.length
      }
    },
    userAnswer
  }
}

export default connect(mapStateToProps)(AnsweredQuestion);