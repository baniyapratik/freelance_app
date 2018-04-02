import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../actions';

class EditProfile extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>
          {field.label}
        </label>

        <input
          className="form-control"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    const val = {
      userid: this.props.userid,

      initial_firstName: this.props.formValues.firstName,
      initial_lastName: this.props.formValues.lastName,
      initial_email: this.props.formValues.email,
      initial_phone: this.props.formValues.phone,
      initial_about: this.props.formValues.About,
      initial_skills: this.props.formValues.Skills,

      ...values
    };

    this.props.updateUserInfo(val).then(() => {
      this.props.onUpdate();
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="First Name"
          name="firstName"
          placeholder={this.props.formValues.firstName}
          value={this.props.formValues.firstName}
          component={this.renderField}
        />
        <Field
          label="Last Name"
          name="lastName"
          placeholder={this.props.formValues.lastName}
          value={this.props.formValues.lastName}
          component={this.renderField}
        />
        <Field
          label="Skills"
          name="skills"
          placeholder={this.props.formValues.Skills}
          value={this.props.formValues.Skills}
          component={this.renderField}
        />

        <Field
          label="Email"
          name="email"
          placeholder={this.props.formValues.email}
          value={this.props.formValues.email}
          component={this.renderField}
        />
        <Field
          label="Phone Number"
          name="phone"
          placeholder={this.props.formValues.phone}
          value={this.props.formValues.phone}
          component={this.renderField}
        />
        <Field
          label="About"
          name="about"
          placeholder={this.props.formValues.About}
          value={this.props.formValues.About}
          component={this.renderField}
        />
        <div className="btn pull-left">
          <Link to="/dashboard" className="btn btn-danger">
            Cancel
          </Link>
        </div>
        <div className="btn pull-right">
          <button type="submit" className="btn btn-primary">
            Submit Changes
          </button>
        </div>
      </form>
    );
  }
}
function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  validate,
  form: 'UpdateUserProfile'
})(connect(null, { updateUserInfo })(EditProfile));
