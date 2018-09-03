import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const RestrictedRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={(props) => (
    rest.isAuthenticated
      ? <Component {...props} />
      : <Redirect 
          to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
  )} />
);

function mapStateToProps({ authedUser }) {
  return { 
    isAuthenticated: authedUser !== null
  };
}

export default connect(mapStateToProps)(RestrictedRoute);