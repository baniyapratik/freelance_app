import React, { Component } from 'react';
import ProjectDetail from './projectDetail';
import MyDashboard from './myDashboard';

class ownerSwitchView extends Component {
  state = {
    showProjectDetail: false,
    projectId: ''
  };

  renderContent() {
    if (this.state.showProjectDetail) {
      return (
        <ProjectDetail
          projectId={this.state.projectId}
          onCancel={() => this.setState({ showProjectDetail: false })}
          onHire={() =>
            this.setState({ showProjectDetail: false, projectId: '' })}
        />
      );
    }
    return (
      <MyDashboard
        onProjectID={val => {
          this.setState({
            projectId: val
          });
        }}
        onProjectSubmit={() => this.setState({ showProjectDetail: true })}
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

export default ownerSwitchView;
