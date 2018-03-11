import React, { Component } from "react";
import FadeIn from 'react-fade-in';
import { Link, withRouter } from "react-router-dom";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import AWS from "aws-sdk";

import { invokeApig } from "../libs/awsLib";
import { S3_PREFIX_URL } from '../App';
import LoaderButton from "../components/LoaderButton";

export default class SellItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 0.00,
      descr: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
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

    try {
      await this.createItem();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }

    this.setState({ isLoading: false });

  }

  createItem() {
    return invokeApig({
      path: "/content/create",
      method: "POST",
      body: {
        name: this.state.name,
        price: this.state.price,
        descr: this.state.descr
      }
    });
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
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="price">
          <span className="editLabel">Price</span>
          <FormControl
            className="editField"
            type="text"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="descr">
          <span className="editLabel">Description</span>
          <FormControl
            className="editField"
            type="text"
            value={this.state.descr}
            onChange={this.handleChange}
          />
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
