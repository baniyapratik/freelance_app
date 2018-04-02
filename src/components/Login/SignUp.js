import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../../actions';
class SignUp extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>
          {field.label}
        </label>

        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    this.props.createUser(values).then(status => {
      if (status === 200) {
        this.props.history.push('/login');
      } else {
        alert('Not able to sign up.');
      }
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="First Name"
          name="firstName"
          component={this.renderField}
        />
        <Field
          label="Last Name"
          name="lastName"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Email"
          name="email"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <div className="btn pull-left">
          <Link to="/login" className="btn btn-warning">
            Cancel
          </Link>
        </div>
        <div className="btn pull-right">
          <button type="submit" className="btn btn-primary">
            Sign Me up
          </button>
        </div>
      </form>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Must enter first name';
  }
  if (!values.lastName) {
    errors.lastName = 'Must enter last name';
  }
  if (!values.email) {
    errors.email = 'Must enter email address';
  }
  if (!values.password) {
    errors.password = 'Must enter password';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostNewUser'
})(connect(null, { createUser })(SignUp));
