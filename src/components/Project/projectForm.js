import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createProject } from '../../actions';

class newProject extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>
          {field.label}
        </label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  renderDate(field) {
    return (
      <div className="form-group">
        <label>
          {field.label}
        </label>
        <input className="form-control" type="date" {...field.input} />
        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    this.props.onProjectSubmit();
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for Project"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Project description"
          name="description"
          component={this.renderField}
        />
        <Field label="Skills" name="skills" component={this.renderField} />
        <Field
          label="Min Budget for Project"
          name="budgetLow"
          component={this.renderField}
        />
        <Field
          label="Max Budget for Project"
          name="budgetHigh"
          component={this.renderField}
        />
        <Field
          label="Pick completion date"
          name="eta"
          component={this.renderDate}
        />
        <div className="btn pull-left">
          <Link to="/dashboard" className="btn btn-danger">
            Cancel
          </Link>
        </div>
        <div className="btn pull-right">
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Must enter title for the project';
  }
  if (!values.skills) {
    errors.skills = 'Must enter skills required for the project';
  }
  if (!values.eta) {
    errors.eta = 'Must select completion ETA ';
  }
  if (!values.description) {
    errors.description = 'Must enter description of the project';
  }
  if (!values.budgetLow) {
    errors.budgetLow = 'Must enter min budget';
  }
  if (!values.budgetHigh) {
    errors.budgetHigh = 'Must enter max budget';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostNewProject',
  destroyOnUnmount: false
})(connect(null, { createProject })(newProject));
