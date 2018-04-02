import React, { Component } from 'react';
import EditProfile from './editProfile';
import ViewProfile from './viewProfile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserInfo } from '../../actions';

class switchProfile extends Component {
  componentDidMount() {
    const values = {
      userid: this.props.userid
    };

    this.props.getUserInfo(values);
  }
  state = {
    showProfileDetail: false
  };

  renderContent() {
    if (this.state.showProfileDetail) {
      return (
        <EditProfile
          userid={this.props.userid}
          formValues={this.props.formValues[0]}
          onCancel={() => this.setState({ showProfileDetail: false })}
          onUpdate={() => {
            this.setState({ showProfileDetail: false });
            this.props.getUserInfo({ userid: this.props.userid });
          }}
        />
      );
    }
    return (
      <ViewProfile
        formValues={this.props.formValues}
        onUserSubmit={() => this.setState({ showProfileDetail: true })}
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
function mapStateToProps({ profileReducer, authenticationReducer }) {
  const isLoggedIn = authenticationReducer.isLoggedIn;
  const username = authenticationReducer.username;
  const userid = authenticationReducer.userid;
  const formValues = profileReducer;

  return { isLoggedIn, username, userid, formValues };
}

export default connect(mapStateToProps, { getUserInfo })(
  withRouter(switchProfile)
);
