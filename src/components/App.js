import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import LoginPage from './Login/LoginPage';
import SignUp from './Login/SignUp';
import Header from './Header';
import Landing from './Landing';
import ownerSwitchView from './MyProject/ownerSwitchView';
import Dashboard from './Dashboard';
import NewProject from './Project/newProject';
import OpenProjects from './OpenProjects';
import UserProfile from './Profile/switchProfile';

function isLoggedIn() {
  if (localStorage.getItem('isLoggedIn') == 'true') {
    return true;
  } else {
    return false;
  }
}
const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isLoggedIn == true ? <Component {...props} /> : <Redirect to="/login" />}
  />;

function requireAuth(nextState, replace) {
  console.log('Imgere');
  console.log(isLoggedIn());

  if (!isLoggedIn()) {
    replace({
      pathname: '/login'
    });
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute
              exact
              path="/view/openProjects"
              component={OpenProjects}
            />
            <Route exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/project/new" component={NewProject} />
            <PrivateRoute
              exact
              path="/app/UserProfile"
              component={UserProfile}
            />
            <PrivateRoute
              exact
              path="/myDashboard"
              component={ownerSwitchView}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
