import React, { Component } from 'react';
import { connect } from 'react-redux';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';

class QuestionPage extends Component {
  render() {
    const { id } = this.props.match.params
    return (
      <div>
        {this.props.status === 'answered'
          ? <AnsweredQuestion id={id} />
          : <UnansweredQuestion id={id} />
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }, { match }) {
  const { id } = match.params;
  return {
    status: Object.keys(users[authedUser].answers).includes(id)
      ? 'answered'
      : 'unanswered'
  };
}

export default connect(mapStateToProps)(QuestionPage);