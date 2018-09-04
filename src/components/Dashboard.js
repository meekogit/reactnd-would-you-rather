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

      const { show } = this.state;

    return (
      <div>
        <div className="toggle-categories">
          <button 
            id="unanswered" 
            onClick={this.handleClick} 
            className={show === 'unanswered' ? 'selected-btn' : 'none'}>
            Unanswered Question
          </button>
          <button 
            id="answered" 
            onClick={this.handleClick}
            className={show === 'answered' ? 'selected-btn' : 'none'}>
            Answered Question
          </button>
        </div>
        <div>
          <ul className="list question-list">
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