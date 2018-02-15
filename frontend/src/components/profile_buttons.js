import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SignupContent from '../../containers/signup_content';
import LoginContent from '../../containers/login_content';

class ProfileButtons extends Component {
  constructor () {
    super();
    this.state = { buttonName: '' };
  }

  renderSelector() {
    if (this.state.buttonName == 'bt-signup') {
      return <SignupContent />;
    }
    else if (this.state.buttonName == 'bt-login') {
      return <LoginContent />;
    }

    // handle error
    return (
      <div>ERROR</div>
    );
  }

  render() {
    return (
      <div className="buttonContainer">
        {/* <button
          onClick={this.handleOpenModal}
          className="nav-item" id="bt-login">
          Login
        </button>
        <button
          onClick={this.handleOpenModal}
          className="nav-item" id="bt-signup">
          Sign Up
        </button> */}
        {/* {this.renderWindow()} */}
      </div>
    );
  }
}

export default ProfileButtons;
