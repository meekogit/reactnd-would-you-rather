import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import Login from './Login';
import RestrictedRoute from './RestrictedRoute';
import PageNotFound from './PageNotFound';

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <LoadingBar className={'loading-bar'}/>
          <div className="container">
            <Switch>
              <RestrictedRoute path='/' exact component={Dashboard} />
              <RestrictedRoute path='/add' component={NewQuestion} />
              <RestrictedRoute path='/questions/:id' component={QuestionPage} />
              <RestrictedRoute path='/leaderboard' component={Leaderboard} />
              <Route path='/login' component={Login} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Fragment>    
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);