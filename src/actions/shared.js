import { getInitialData, saveAnswer } from '../utils/api';
import { receiveUsers, addAnswer } from '../actions/users';
import { receiveQuestions, addVote } from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
      }).then(() => dispatch(hideLoading()));
  }
}

export function handleVote(answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const vote = {...answer, authedUser };
    dispatch(showLoading());
    return saveAnswer(vote)
      .then(() => {
        dispatch(addVote(vote));
        dispatch(addAnswer(vote));
      }).then(() => dispatch(hideLoading()));
  }
}