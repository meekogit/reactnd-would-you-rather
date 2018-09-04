import React from 'react';
import { connect } from 'react-redux';

const AnsweredQuestion = ({ author, question, userAnswer }) => {
    const avatarURL = require(`../utils/avatars/${author.avatarURL}`);
    const { optionOne, optionTwo, totalVotes } = question;
    const onePercent = optionOne.votes*100/totalVotes;
    const twoPercent = optionTwo.votes*100/totalVotes;
    
    return (
      <div className="answer-card">
        <div className="author-details">
          <img
            src={avatarURL}
            alt={`Avatar of ${author.name}`}
            className="avatar"
          />
          <h3>{`Asked by ${author.name}:`}</h3>
        </div>
        <div className={userAnswer === 'optionOne' ? 'user-option' : 'none'}>
          {userAnswer === 'optionOne' && <span>Your answer</span>}
          <p>{`Would you rather ${optionOne.text}?`}</p>
          <p className="percentage">{onePercent}%</p>
          <div className="bar">
            <div 
            className={onePercent === 0 ? "bar-level zero-percent" : "bar-level"} 
            style={{'width': `${onePercent}%`}}
            ></div>
          </div>
          <p className="vote-count">{`${optionOne.votes} of ${totalVotes} votes`}</p>
        </div>
        <div className={userAnswer === 'optionTwo' ? 'user-option' : 'none'}>
          {userAnswer === 'optionTwo' && <span>Your answer</span>}
          <p>{`Would you rather ${optionTwo.text}?`}</p>
          <p className="percentage">{twoPercent}%</p>
          <div className="bar">
            <div 
              className={twoPercent === 0 ? "bar-level zero-percent" : "bar-level"}
              style={{width: `${twoPercent}%`}}
            ></div>
          </div>
          <p className="vote-count">{`${optionTwo.votes} of ${totalVotes} votes`}</p>
        </div>
      </div>
    );
}

function mapStateToProps({ users, authedUser, questions }, { id }) {
  const { optionOne, optionTwo, author } = questions[id];
  const userAnswer = users[authedUser].answers[id];
  const { name, avatarURL } = users[author];
  console.log(optionOne, optionTwo);
  
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