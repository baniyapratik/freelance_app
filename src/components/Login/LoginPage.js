import React, { Component } from 'react';
import LoginForm from './LoginForm';
class LoginPage extends Component {
  onSubmit() {}
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1 align="center">Login</h1>
          <LoginForm />
        </div>
      </div>
    );
  }
}
export default LoginPage;
