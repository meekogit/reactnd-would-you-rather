import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleVote } from '../actions/shared';

class UnansweredQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = { option: 'optionOne' };
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const option = event.target.value;
    this.setState({ option });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    this.props.dispatch(handleVote({
      qid: this.props.question.id,
      answer: this.state.option
    }));
  }

  render() {
    const { author, question } = this.props;
    const avatarURL = require(`../utils/avatars/${author.avatarURL}`)
    return(
      <div>
        <img
          src={avatarURL}
          alt={`Avatar of ${author.name}`}
          className="avatar"
        />
        <h3>{author.name} asks:</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Would you rather...</p>
          <label>
            <input 
              value="optionOne" 
              type="radio"
              checked={this.state.option === "optionOne"}
              onChange={this.handleChange}
            />
            {question.optionOne.text}
          </label> 
          <label>
            <input 
              value="optionTwo" 
              type="radio"
              checked={this.state.option === "optionTwo"}
              onChange={this.handleChange}
            />
            {question.optionTwo.text}
          </label>
          <button type="submit">Vote</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const { avatarURL, name } = users[question.author];
  return {
    author: { avatarURL, name },
    question
  };
}

export default connect(mapStateToProps)(UnansweredQuestion);
