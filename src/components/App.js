import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">

            <Nav />
            {this.props.loading
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/questions/:id' component={QuestionPage} />
                  <Route path='/leaderboard' component={Leaderboard} />
                </div>
            }
          </div>
        </Fragment>    
      </Router>
    );
  }
}

function mapStateToProps({ questions, users }) {
  return {
    // TODO: change this horrible code to authedUser !== null 
    // or back to loadingBar or change to authenticated flag
    loading: Object.keys(questions).length === 0 || Object.keys(users).length === 0
  }
}

export default connect(mapStateToProps)(App);
