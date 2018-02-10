import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SignupContent extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field; // ES6 syntax
    const className = `form-group ${touched && error ? 'has-danger' : ''} `

    return (
      <div className={className}>
        <input
          className="form-control allField"
          placeholder={field.holder}
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  onSubmit(values) {
    // handle sumbit action
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="emailAddress"
          holder="Purdue Email Address"
          component={this.renderField}
        />
        <Field
          name="confirmationCode"
          holder="Confirmation Code"
          component={this.renderField}
        />
        <button className="signupSubmitButton">Sign Up</button>
        <div className="signupLoginDivLine"></div>
        <div className="signupLoginTextContainer">
          <span className="signupLoginText">Already have an account? Login here</span>
        </div>
      </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // if errors is empty, form is fine to submit
  return errors;
}

// handles showing multiple forms on the same page
// treat it just like connect()()
export default reduxForm({
  validate: validate,
  form: 'SignUpForm' // has to be unique
})(SignupContent);
