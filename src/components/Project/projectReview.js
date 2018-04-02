import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProject } from '../../actions';
class projectReview extends React.Component {
  onSubmitProject() {
    this.props.createProject(this.props.formValues).then(() => {
      this.props.history.push('/dashboard');
    });
  }
  render() {
    return (
      <div>
        <h3 align="center"> Pls confirm your Project</h3>
        <div>
          <label> Project Title</label>
          <div name="title">
            {this.props.formValues.title}
          </div>
        </div>
        <div>
          <label> Description for Project</label>
          <div name="description">
            {this.props.formValues.description}
          </div>
        </div>
        <div>
          <label> Skills</label>
          <div name="skills">
            {this.props.formValues.skills}
          </div>
        </div>

        <div>
          <label> Min Budget for Project</label>
          <div name="budgetLow">
            {this.props.formValues.budgetLow}
          </div>
        </div>
        <div>
          <label> Max Budget for Project</label>
          <div name="budgetHigh">
            {this.props.formValues.budgetHigh}
          </div>
        </div>
        <div>
          <label> Estimate Project completion Date</label>
          <div name="eta">
            {this.props.formValues.eta}
          </div>
        </div>
        <div className="btn pull-left">
          <button className="btn btn-warning" onClick={this.props.onCancel}>
            Back
          </button>
        </div>

        <div className="btn pull-right">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmitProject.bind(this)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.PostNewProject.values };
}
export default connect(mapStateToProps, { createProject })(
  withRouter(projectReview)
);
