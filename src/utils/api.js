import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA'

/*
RETURNS:
users = { A normalized collection of users
  <userid>: {
              id:          unique username
              name:        name
              avatarURL:   url of the user's avatar
              answers:     a collection of questions the user has answer and the 
                          corresponding answer in the form <qid>: <answer>
              questions:   an array with the ids of all the question the user has created
            }
  ...
}

questions = { A normalized collection of questions
  <qid>: {
            id:           question ide
            timestamp:    creation time
            author:       id of the user that created the question
            optionOne: {
              votes:      array of ids of users who votes for option 1 (initially [])
              text:       text of the actual option
            },
            optionTwo: {
              votes:      array of ids of users who votes for option 2 (initially [])
              text:       text of the actual option
            }
          }
  ...
}
*/
export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, questions]) => ({
    users,
    questions
  }))
}

/* 
RECEIVES:
question =  { 
  authedUser: id of the user answering the question
  qid:        id of the question being answered
  answer:     'optionOne' || 'optionTwo'
}
*/
export function saveQuestion(question) {
  return _saveQuestion(question)
}

/*
RECEIVES:
answer = { 
  authedUser: id of the user answering the question
  qid:        id of the question being answered
  answer:     'optionOne' || 'optionTwo'
  }
RETURNS:
question = {
    id:           question id
    timestamp:    creation time
    author:       id of the user that created the question
    optionOne: {
      votes:      array of ids of users who votes for option 1 (initially [])
      text:       text of the actual option
    },
    optionTwo: {
      votes:      array of ids of users who votes for option 2 (initially [])
      text:       text of the actual option
  }
*/
export function saveAnswer(answer) {
  return _saveQuestionAnswer(answer)
}