import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import FadeIn from 'react-fade-in';
import AWS from "aws-sdk";

import { invokeApig } from "../libs/awsLib";
import { S3_PREFIX_URL } from '../App';
import LoaderButton from "../components/LoaderButton";

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemID: props.match.params.id,
      name: "",
      price: 0,
      descr: "",
    };
  }

  async componentDidMount() {
    try {
      const results = await this.fetchItem();
      this.setState({
        name: results.name,
        price: results.price,
        descr: results.descr
      });
    } catch (e) {
      alert(e);
    }
  }

  fetchItem() {
    return invokeApig({
      path: "/content/" + this.state.itemID,
      method: "GET"
    });
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
      await this.updateItem();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }

    this.setState({ isLoading: false });

  }

  updateItem(imageURL) {
    return invokeApig({
      path: "/content/" + this.state.itemID,
      method: "PUT",
      body: { name: this.state.name, price: this.state.price, descr: this.state.descr }
    });
  }

  handleDeleteItem = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.deleteItem();
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }

    this.setState({ isLoading: false });

  }

  deleteItem() {
    return invokeApig({
      path: "/content/" + this.state.itemID,
      method: "DELETE",
    });
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

  renderBackNTag() {
    const backImgLink = `${S3_PREFIX_URL}public_img/left-arrow-angle-big-gross-symbol.svg`;

    return (
      <div className="itemDetailTopBar">
        <Link className="backButton" to="/profile">
          <img className="backBT-img" src={backImgLink} />
        </Link>
        <span className="backnTag">Back</span>
      </div>
    );
  }

  renderDeleteBtn() {
    return (
      <div>
        <LoaderButton
          className="saveButton signupBtn"
          block
          type="submit"
          isLoading={this.state.isLoading}
          text="Delete"
          id="submitButtonDelete"
          onClick={this.handleDeleteItem}
        />
        {/* <button
          className="saveButton signupBtn"
          id="bt-delete"
          onClick={this.handleDeleteItem}>Delete</button> */}
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid edit-item-page-container">
        <FadeIn>
          <div className="row">
            {this.renderBackNTag()}
            {this.renderForm()}
            {this.renderDeleteBtn()}
          </div>
        </FadeIn>
      </div>
    );
  }

}

export default withRouter(EditItem);
