import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  onLogout(values) {
    this.props.logoutUser(values).then(() => {
      if (this.props.logout_status === 200) {
        localStorage.setItem('isLoggedIn', false);
        this.props.history.push('/login');
      } else {
        console.log('error happened');
      }
    });
  }
  renderContent() {
    switch (this.props.isLoggedIn) {
      case null:
        return;
      case false:
        return (
          <div>
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link className="navbar-brand" to="/login">
                Freelance
              </Link>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/login"> Login </Link>
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link className="navbar-brand" to="/dashboard">
                Freelance
              </Link>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/view/openProjects">Open Projects</Link>
                </li>
                <li>
                  <Link to="/dashboard">All Projects</Link>
                </li>
                <li>
                  <Link to="/myDashboard">My Projects</Link>
                </li>
                <li>
                  <Link to="/project/new">Post Project</Link>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/app/UserProfile">
                    <span className="glyphicon glyphicon-user" />
                    {this.props.username}
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span
                      onClick={this.onLogout.bind(this)}
                      className="glyphicon glyphicon-log-in"
                    >
                      Logout
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        );
    }
  }
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ authenticationReducer }) {
  const isLoggedIn = authenticationReducer.isLoggedIn;
  const username = authenticationReducer.username;
  const logout_status = authenticationReducer.logout_status;
  return { isLoggedIn, username, logout_status };
}
export default connect(mapStateToProps, { logoutUser })(withRouter(Header));
