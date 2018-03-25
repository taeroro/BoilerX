import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { invokeApig, s3Upload } from "../libs/awsLib";
import config from "../config";
import LoaderButton from "../components/LoaderButton";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      user: null,
      username: ""
    };

    this.file = null;
  }

  async componentDidMount() {
    try {
      const results = await this.fetchUser();
      this.setState({
        user: results,
        username: results.username
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

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    // upload picture to S3
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }

    this.setState({ isLoading: true });

    try {
      const uploadedFilename = this.file
        ? (await s3Upload(this.file, "user_img")).Location
        : null;

      await this.updateProfile(uploadedFilename);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    // end of uploading picture to S3

    this.setState({ isLoading: false });

    // 
    // window.location.reload();
  }

  updateProfile(imageURL) {
    if (!imageURL) {
      return invokeApig({
        path: "/user/profile",
        method: "PUT",
        body: { username: this.state.username, imageURL: this.state.user.imageURL }
      });
    }

    return invokeApig({
      path: "/user/profile",
      method: "PUT",
      body: { username: this.state.username, imageURL: imageURL}
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
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <p className="descrLabel">Your public profile only shows your username.</p>
        </FormGroup>
        <FormGroup controlId="email">
          <span className="editLabel">Email</span>
          <div className="editField editFieldPLUS">
            {/* BUG 5: email displaying the false email */}
            {/* <span>{this.state.user ? "this.state.user.email" : "Loading..." }</span> */}
            <span>Loading...</span>
          </div>
          <p className="descrLabel">Your email address won’t be shared to the public. It will only be shared when you confirm to sell your item to someone.</p>
        </FormGroup>
        {/* <div>
          <span className="editLabel">Joined Date</span>
          <div className="editField editFieldPLUS">
            <span>Dec. 19, 2017</span>
          </div>
          <p className="descrLabel">You can’t modify the date you joined.</p>
        </div> */}
        <FormGroup controlId="file">
          <ControlLabel>Profile Picture</ControlLabel>
          <FormControl onChange={this.handleFileChange} type="file" />
        </FormGroup>
        <FormGroup>
          <img className="profile-edit-img" src={this.state.user ? this.state.user.imageURL : "" } />
        </FormGroup>
        <LoaderButton
          className="saveButton signupBtn"
          block
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Save"
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
