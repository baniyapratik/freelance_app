import React, { Component } from 'react';
import { userBid, fetchProjects } from '../actions';
import { connect } from 'react-redux';

import '../css/style.css';
class Horizontal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: (this.props.low + this.props.high) / 2
    };
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  onProjectBid(value) {
    const values = {
      bidValue: value,
      pid: this.props.projectid
    };

    console.log(values);
    this.props.userBid(values).then(() => {
      this.props.fetchProjects();
    });
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <label>Bid Amount</label>
        <div className="slider">
          <div className="slidecontainer">
            <input
              type="range"
              min={this.props.low}
              max={this.props.high}
              value={value}
              onChange={this.handleChange}
              className="slider"
              id="myRange"
            />
          </div>
        </div>
        <div className="value">
          {value}
        </div>
        <button
          disabled={this.props.projectStatus === 1 ? 'value' : ''}
          onClick={this.onProjectBid.bind(this, value)}
          className="btn btn-info btn-sm"
        >
          <span className="glyphicon glyphicon-thumbs-up" /> Bid
        </button>
      </div>
    );
  }
}

export default connect(null, { userBid, fetchProjects })(Horizontal);
