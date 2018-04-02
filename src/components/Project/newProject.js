import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ProjectForm from './projectForm';
import ProjectReview from './projectReview';

class newProject extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <ProjectReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <ProjectForm
        onProjectSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'PostNewProject'
})(newProject);
