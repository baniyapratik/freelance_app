import React from 'react';
import { withRouter } from 'react-router-dom';

class viewProfile extends React.Component {
  onCancel() {
    this.props.history.push('/dashboard');
  }
  onSubmitUser() {
    this.props.onUserSubmit();
  }

  render() {
    const thing = "'s";

    return (
      <div>
        <h3 align="center">
          {this.props.formValues[0] ? this.props.formValues[0].firstName : ''}
          {thing} Profile
        </h3>
        <div>
          <label> First Name</label>
          <div name="firstName">
            {this.props.formValues[0] ? this.props.formValues[0].firstName : ''}
          </div>
        </div>
        <div>
          <label> Last Name</label>
          <div name="lastName">
            {this.props.formValues[0] ? this.props.formValues[0].lastName : ''}
          </div>
        </div>
        <label> Email </label>
        <div name="email">
          {this.props.formValues[0] ? this.props.formValues[0].email : ''}
        </div>
        <div>
          <label> Phone Number</label>
          <div name="phone">
            {this.props.formValues[0] ? this.props.formValues[0].phone : ''}
          </div>
        </div>
        <div>
          <label> Skills</label>
          <div name="skills">
            {this.props.formValues[0] ? this.props.formValues[0].Skills : ''}
          </div>
        </div>

        <div>
          <label> About</label>
          <div name="About">
            {this.props.formValues[0] ? this.props.formValues[0].about : ''}
          </div>
        </div>

        <div className="btn pull-left">
          <button
            className="btn btn-warning"
            onClick={this.onCancel.bind(this)}
          >
            Back
          </button>
        </div>

        <div className="btn pull-right">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmitUser.bind(this)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(viewProfile);
