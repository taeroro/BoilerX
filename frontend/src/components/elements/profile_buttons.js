import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProfileButtons extends Component {
  render() {
    return (
      <div className="buttonContainer">
        <Link className="nav-item bt-login" to="/">Login</Link>
        <Link className="nav-item bt-signup" to="/">Sign Up</Link>
      </div>
    );
  }
}
