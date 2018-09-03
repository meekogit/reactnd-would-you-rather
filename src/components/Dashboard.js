import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = { show: 'unanswered' };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.toggleQuestions(event.target.id);
  }

  toggleQuestions(id) {
    const { show } = this.state;
    if (show !== id) {
      this.setState({ show: id });
    }
  }

  render() {
    
    const list = this.state.show === 'unanswered' 
      ? this.props.unansweredQids 
      : this.props.answeredQids;

    return (
      <div>
        <div>
          <button id="unanswered" onClick={this.handleClick}>
            Unanswered Question
          </button>
          <button id="answered" onClick={this.handleClick}>
            Answered Question
          </button>
        </div>
        <div>
          <ul>
            { list.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {

  const qids = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
 
  return {
    answeredQids: qids.filter(qid => Object.keys(users[authedUser].answers).includes(qid)),
    unansweredQids: qids.filter(qid => !Object.keys(users[authedUser].answers).includes(qid))
  };
}

export default connect(mapStateToProps)(Dashboard);