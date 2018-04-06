import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from '../../actions';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Horizontal from '../horizontalSlider';

class MyDashboard extends Component {
  constructor(props) {
    super(props);
    this.renderProjects.bind(this);
  }
  componentDidMount() {
    this.props.fetchProjects();
  }
  onDelete(project) {
    this.props.deleteProject(project).then(() => {
      this.props.fetchProjects();
    });
  }
  onSubmit(project) {
    this.props.onProjectID(project._id);
    this.props.onProjectSubmit(project);
  }
  renderProjects() {
    const newArray = _.values(this.props.projects);
    console.log(this.props.projects);
    return _.filter(newArray, project => {
      return project.ownerid._id === this.props.userid;
    }).map(project => {
      return (
        <li className="list-group-item" key={project._id}>
          <div className="card">
            <div className="card-block">
              {project.ownerid._id || project.ownerid === this.props.userid
                ? <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.onDelete.bind(this, project)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                : ''}

              <h4 className="card-title">
                <strong>Title: </strong>
                {project.Title}
              </h4>
              <h6 className="card-subtitle mb-2 text-muted">
                <Link to="#" className="card-link">
                  Employer: {project.ownerid ? project.ownerid.email : ''}
                </Link>
              </h6>
              <p className="card-text">
                <strong>Description:</strong> {project.Description}
              </p>
              <div className="card-link">
                <strong>Total Bid count: </strong>
                <span className="badge">
                  {project.cnt}
                </span>
                <strong> Average Bid Value: </strong>
                <span className="badge">
                  {project.aver}
                </span>
              </div>
              <br />

              {project.ownerid._id !== this.props.userid
                ? <Horizontal
                    projectid={project._id}
                    low={project.Budget_low}
                    high={project.Budget_high}
                  />
                : ''}
              <br />
              <button
                onClick={this.onSubmit.bind(this, project)}
                className="btn alert alert-warning"
              >
                Detail View
              </button>
              <br />
              {project.status === 1
                ? <label className="alert alert-danger" role="alert">
                    Status: Closed
                  </label>
                : <label className="alert alert-success">Status: Open</label>}

              <label className="alert alert-dark" role="alert">
                Date Created: {Moment(project.createdAt).format('D MMM YYYY')}
              </label>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="btn pull-right">
          <Link to="/project/new" className="btn btn-primary">
            Add New Project
          </Link>
        </div>
        <h3 align="center">My Projects</h3>
        <br />
        <div>
          <ul className="list-group">
            {this.renderProjects()}
          </ul>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ projects, authenticationReducer }) {
  const isLoggedIn = authenticationReducer.isLoggedIn;
  const username = authenticationReducer.username;
  const userid = authenticationReducer.userid;

  return { projects, isLoggedIn, username, userid };
}

export default connect(mapStateToProps, { fetchProjects, deleteProject })(
  MyDashboard
);
