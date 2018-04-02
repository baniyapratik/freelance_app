import React from 'react';
import '../css/style.css';

class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className="landingPage">
          <br />
          <div className="buttonHolder">
            <h1 align="Center"> Welcome to Freelance</h1>
            <p> Sign in to post or view jobs.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
