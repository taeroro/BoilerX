import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect} from 'react-redux';
import { login } from '../actions';

class LoginContent extends Component {
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
    this.props.login(values, () => {
      alert("Logged in");
    });
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
          name="password"
          holder="Password"
          component={this.renderField}
        />
        <button className="loginSubmitButton">Login</button>
        <div className="signupLoginDivLine"></div>
        <div className="signupLoginTextContainer">
          <span className="signupLoginText">Don’t have an account? Sign up here</span>
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
  form: 'LoginForm' // has to be unique
})(
  connect(null,{login})(LoginContent)
);
