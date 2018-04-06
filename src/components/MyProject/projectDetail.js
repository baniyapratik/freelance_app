import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, getProjectDetail, hireUser } from '../../actions';
import Moment from 'moment';

class ProjectDetail extends Component {
  componentDidMount() {
    this.props.getProjectDetail(this.props.projectId);
  }
  renderError() {
    return (
      <div>
        <h1 align="center"> No one has bid on your project yet!</h1>
      </div>
    );
  }
  onHireClick(values) {
    console.log(values);
    const newValue = {
      userId: values._id,
      projectId: this.props.projectId
    };
    this.props.hireUser(newValue, () => {
      this.props.onHire().then(() => {
        this.props.getProjectDetail(this.props.projectId);
      });
    });
  }

  onButtonCancel() {
    this.props.fetchProjects().then(() => {
      this.props.onCancel();
    });
  }

  renderProjects() {
    let counter = 0;
    console.log(this.props.projects);
    return _.map(this.props.projects, project => {
      return (
        <li className="list-group-item" key={++counter}>
          <div className="card">
            <div className="card-block">
              <div className="card">
                <div className="card-header">
                  {project.userId ? project.userId.email : ''}
                </div>
                <div className="card-body">
                  Bid price: {project.bid_value}
                  <br />
                  Bid Date: {Moment(project.bidDate).format('D MMM YYYY')}{' '}
                  <br />
                  Email: {project.userId ? project.userId.email : ''}
                  <br />
                  Skills:{project.Skills ? project.Skills : 'None'}
                  <br />
                </div>
                {project.userId
                  ? [
                      project.userId._id == project.projectId.hiredUser
                        ? <button
                            className="btn btn-warning"
                            onClick={this.onHireClick.bind(
                              this,
                              project.userId
                            )}
                          >
                            Pay Hired User
                          </button>
                        : <button
                            className="btn btn-success"
                            onClick={this.onHireClick.bind(
                              this,
                              project.userId
                            )}
                          >
                            Hire
                          </button>
                    ]
                  : ''}
              </div>
            </div>
          </div>
        </li>
      );
    });
  }
  render() {
    console.log(this.props.projects);

    return (
      <div>
        <h1 align="center">
          <strong>Title: </strong>
          {this.props.projects[0].projectId
            ? this.props.projects[0].projectId.Title
            : ''}
        </h1>
        <h4 align="center">
          <strong>Description: </strong>
          {this.props.projects[0].projectId
            ? this.props.projects[0].projectId.Description
            : ''}
          <br />
          <strong>Days Remaining: </strong>
          7 Days
          <br />
          <strong>Skills Required: </strong>
          {this.props.projects[0].projectId
            ? this.props.projects[0].projectId.Skills
            : <div>None</div>}
        </h4>
        <ul className="list-group">
          {this.props.projects[0].firstName === null
            ? this.renderError()
            : this.renderProjects()}
        </ul>
        <button
          className="btn btn-warning"
          onClick={this.onButtonCancel.bind(this)}
        >
          Back
        </button>
      </div>
    );
  }
}
function mapStateToProps({ projects }) {
  console.log(projects);
  return { projects };
}
export default connect(mapStateToProps, {
  fetchProjects,
  getProjectDetail,
  hireUser
})(withRouter(ProjectDetail));
