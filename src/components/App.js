import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  render() {
    return (
      <div className="App">
        <LoadingBar />
        <h1>Would You Rather</h1>
        {!this.props.loading && <Dashboard />}
      </div>
    );
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar.default === 1 ? true : false 
  }
}

export default connect(mapStateToProps)(App);