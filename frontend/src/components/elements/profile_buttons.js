import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

import SignupContent from '../../containers/signup_content';

class ProfileButtons extends Component {
  constructor () {
    super();

    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    ReactModal.setAppElement('.appContainer');
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
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
        <SignupContent />
      </ReactModal>
    );
  }

  render() {
    return (
      <div className="buttonContainer">
        <button
          className="nav-item bt-login">
          Login
        </button>
        <button
          onClick={this.handleOpenModal}
          className="nav-item bt-signup">
          Sign Up
        </button>
        {this.renderWindow()}
      </div>
    );
  }
}

export default ProfileButtons;
