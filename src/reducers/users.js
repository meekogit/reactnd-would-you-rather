import { RECEIVE_USERS, ADD_ANSWER } from '../actions/users';
import { ADD_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_QUESTION:
      const { author, id } = action.question
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: [...state[author].questions, id]
        }
      };
    case ADD_ANSWER:
      console.log(action);
      const { qid, authedUser, answer } = action.answer;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          } 
        }
      }
    default:
      return state;
  }
}