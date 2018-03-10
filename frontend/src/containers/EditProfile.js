import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { invokeApig } from "../libs/awsLib";

import LoaderButton from "../components/LoaderButton";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      user: null,
      username: ""
    };
  }
  async componentDidMount() {
    try {
      const results = await this.fetchUser();
      console.log(results);

      this.setState({
        user: results
      });
    } catch (e) {
      alert(e);
    }
  }

  fetchUser() {
    return invokeApig({
      path: "/user/profile",
      method: "GET"
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await this.updateProfile();
      // this.setState({
      //   newUser: newUser
      // });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  updateProfile() {
    return invokeApig({
      path: "/user/profile",
      method: "PUT",
      body: { username: this.state.username }
    });
  }

  validateForm() {
    return (
      this.state.username.length > 0
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>

        <FormGroup controlId="username">
          <span className="editLabel">Username</span>
          <FormControl
            className="editField"
            placeholder={this.state.user ? this.state.user.username : "Loading..."}
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <p className="descrLabel">Your public profile only shows your username.</p>
        </FormGroup>
        <FormGroup controlId="email">
          <span className="editLabel">Email</span>
          <div className="editField editFieldPLUS">
            <span>{this.state.user ? this.state.user.email : "Loading..." }</span>
          </div>
          <p className="descrLabel">Your email address won’t be shared to the public. It will only be shared when you confirm to sell your item to someone.</p>
        </FormGroup>
        <div>
          <span className="editLabel">Joined Date</span>
          <div className="editField editFieldPLUS">
            <span>Dec. 19, 2017</span>
          </div>
          <p className="descrLabel">You can’t modify the date you joined.</p>
        </div>
        <LoaderButton
          className="saveButton signupBtn"
          block
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Save"
          loadingText="Uploading..."
          id="submitButtonSave"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="edit-profile-container col-sm-9">
        {this.renderForm()}
      </div>
    );
  }
}

export default EditProfile;
