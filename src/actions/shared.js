import { getInitialData, saveAnswer, saveQuestion } from '../utils/api';
import { receiveUsers, addAnswer, addQuestionToUser } from '../actions/users';
import { receiveQuestions, addVote, addQuestion } from '../actions/questions';
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

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    return saveQuestion({author: authedUser, optionOneText, optionTwoText})
      .then(question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      })
      .then(() => dispatch(hideLoading()));
  }
}