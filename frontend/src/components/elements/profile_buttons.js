import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

import SignupContent from '../../containers/signup_content';
import LoginContent from '../../containers/login_content';

class ProfileButtons extends Component {
  constructor () {
    super();

    this.state = {
      showModal: false,
      buttonName: ''
     };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    ReactModal.setAppElement('.appContainer');
  }

  handleOpenModal(event) {
    this.setState({
      showModal: true,
      buttonName: event.target.id
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      buttonName: ''
    });
  }

  renderWindow() {
    return (
      <ReactModal
         isOpen={this.state.showModal}
         contentLabel="Window Modal"
         className="Modal"
         overlayClassName="Overlay">
        <button
          onClick={this.handleCloseModal}
          className="windowCloseButton"></button>
        {this.renderSelector()}
      </ReactModal>
    );
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
        <button
          onClick={this.handleOpenModal}
          className="nav-item" id="bt-login">
          Login
        </button>
        <button
          onClick={this.handleOpenModal}
          className="nav-item" id="bt-signup">
          Sign Up
        </button>
        {this.renderWindow()}
      </div>
    );
  }
}

export default ProfileButtons;
