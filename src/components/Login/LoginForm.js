import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalToggle: ''
    };
  }
  onSubmitUser(values) {
    this.props.loginUser(values).then(() => {
      if (this.props.login_status === 200) {
        localStorage.setItem('isLoggedIn', true);
        this.props.history.push('/dashboard');
      } else {
        this.setState = { modalToggle: 'show' };

        console.log(this.state.modalToggle);
        alert('Re-try: Please check the email address and password.');
      }
    });
  }
  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmitUser.bind(this))}>
          <div className="form-group">
            <label>User Email</label>
            <div>
              <Field
                label="User Email"
                name="email"
                component="input"
                className="form-control"
                type="text"
                placeholder="Your email address"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div>
              <Field
                label="Password"
                name="password"
                component="input"
                className="form-control"
                type="password"
                placeholder="Your password"
              />
            </div>
          </div>

          <div className="btn-toolbar">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={pristine || submitting}
            >
              Submit
            </button>
            <button
              type="submit"
              className="btn btn-warning btn-block"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </div>
          <br />
          <div>
            <Link to="/signup" className="btn btn-success btn-sm btn-block">
              Sign Up
            </Link>
          </div>
        </form>
        <div
          id="myModal"
          className="modal fade"
          role="dialog"
          show={this.state.modalToggle}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Authentication error</h4>
              </div>
              <div className="modal-body">
                <p>Re-try: Please check the email address and password.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const login_status = state.authenticationReducer.login_status;
  const isLoggedIn = state.authenticationReducer.isLoggedIn;

  return { login_status, isLoggedIn };
}
export default reduxForm({
  form: 'login'
})(connect(mapStateToProps, { loginUser })(withRouter(LoginForm)));
