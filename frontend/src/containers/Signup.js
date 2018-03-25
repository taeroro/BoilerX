import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl } from "react-bootstrap";
import { AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { invokeApig } from "../libs/awsLib";

import config from "../config";
import LoaderButton from "../components/LoaderButton";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0

      // BUG 1: confirm password != password
      // this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // BUG 2: allow non purdue email to register
    // if (!this.state.email.includes("@purdue.edu")) {
    //   alert("Invalid: Email has be a valid Purdue email address");
    //   return;
    // }

    this.setState({ isLoading: true });

    try {
      // const newUser = await this.signup(this.state.email, this.state.password);
      const newUser = await this.signup(this.state.email, "CS408_TEAM_29");
      this.setState({
        newUser: newUser
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode);
      await this.authenticate(
        this.state.newUser,
        this.state.email,
        // this.state.password
        "CS408_TEAM_29"
      );

      this.props.userHasAuthenticated(true);
      this.signupDB();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  signupDB() {
    return invokeApig({
      path: "/user/create",
      method: "POST",
      // body: { email: this.state.email, username: this.state.username }
      // BUG 14: can't update username
      body: { email: this.state.email, username: "default_username" }
    });
  }

  signup(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    return new Promise((resolve, reject) =>
      userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      })
    );
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    );
  }

  authenticate(user, email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode">
          <FormControl
            className="allField"
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
            placeholder="Confirmation Code"
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          className="SubmitButton signupBtn"
          block
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email">
          <FormControl
            className="allField"
            autoFocus
            type="email"
            placeholder="Purdue Email Address"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="username">
          <FormControl
            className="allField"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            className="allField"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormControl
            className="allField"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
            placeholder="Confirm Password"
          />
        </FormGroup>
        <LoaderButton
          className="SubmitButton signupBtn"
          block
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Sign up"
          loadingText="Signing up…"
          id="submitButtonSignup"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
