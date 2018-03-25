import React, { Component } from "react";
import FadeIn from 'react-fade-in';
import { Link, withRouter } from "react-router-dom";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import AWS from "aws-sdk";
import config from "../config";

import { invokeApig, s3Upload } from "../libs/awsLib";
import { S3_PREFIX_URL } from '../App';
import LoaderButton from "../components/LoaderButton";

export default class SellItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 0.00,
      descr: "",
      user: null
    };
    this.file = null;
  }

  async componentDidMount() {
    try {
      const results = await this.fetchUser();

      this.setState({
        user: results,
        // username: results.username
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

  validateForm() {
    if (this.state.name && this.state.descr) {
      return (
        this.state.name.length > 0 &&
        this.state.price >= 0 &&
        this.state.descr.length > 0
      );
    }
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
        ? (await s3Upload(this.file, "item_img")).Location
        : null;

      await this.createItem(uploadedFilename);

      this.setState({ isLoading: false });
      alert("Item post complete.");

      // window.location.reload();

      // BUG 18: redirect wrong page
      this.props.history.push("/heyUgotMe");

    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    // end of uploading picture to S3

  }

  createItem(imgURL) {
    if (this.state.name.length < 30) {
      var currName = this.state.name;
      for (var i = this.state.name.length; i < 30; i++) {
        currName += "-";
      }

      this.setState({ name: currName });

      return invokeApig({
        path: "/content/create",
        method: "POST",
        body: {
          name: currName,
          price: this.state.price,
          descr: this.state.descr,
          sellerName: this.state.user.username,
          sellerEmail: this.state.user.email,
          sellerImg: this.state.user.imageURL,
          imageURL: imgURL
        }
      });
    }

  }

  renderTitle() {
    return (
      <h1 className="post-new-item-label">Post New Item: </h1>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="name">
          <span className="editLabel">Name</span>
          <FormControl
            className="editField"
            type="text"
            maxLength="30"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="price">
          <span className="editLabel">Price</span>
          <FormControl
            className="editField"
            type="number"
            step="0.01"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="descr">
          <span className="editLabel">Description</span>
          <FormControl
            className="editField"
            type="text"
            maxLength="100"
            value={this.state.descr}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Item Picture</ControlLabel>
          <FormControl onChange={this.handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          className="saveButton signupBtn"
          block
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Post"
          id="submitButtonSave"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="container-fluid edit-item-page-container">
        <FadeIn>
          <div className="row">
            {this.renderTitle()}
            {this.renderForm()}
          </div>
        </FadeIn>
      </div>
    );
  }

}
