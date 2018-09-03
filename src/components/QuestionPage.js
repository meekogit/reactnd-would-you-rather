import React from 'react';
import { connect } from 'react-redux';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
import PageNotFound from './PageNotFound';

const QuestionPage = ({ status, exists, match }) => {
  const { id } = match.params;
  if(!exists) {
    return <PageNotFound />;
  }

  return (
    <div>
      {status === 'answered'
        ? <AnsweredQuestion id={id} />
        : <UnansweredQuestion id={id} />
      }
    </div>
  )
};

function mapStateToProps({ authedUser, users, questions }, { match }) {
  const { id } = match.params;
  
  return {
    status: Object.keys(users[authedUser].answers).includes(id)
      ? 'answered'
      : 'unanswered',
    exists: questions[id] ? true : false
  };
}

export default connect(mapStateToProps)(QuestionPage);