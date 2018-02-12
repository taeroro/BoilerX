import { renderComponent , expect } from '../test_helper';
import LoginContent from '../../src/containers/login_content';
import SignupContent from '../../src/containers/signup_content';

const assert = require('chai').assert;
const login = require('../../src/actions/index').login;
import { LOGIN } from '../../src/actions/index';


describe('Login Button Test' , () => {
  let component;
  let email = "1@purdue.edu";
  let pool = "abc"

  beforeEach(() => {
    component = renderComponent(LoginContent);
  });

  it('Test_Select_CallBack', () => {
    expect(component).to.exist;
  });

  it('Test_Callback_Function: email: '+ email + "  pool: "+pool, () => {
      assert.notStrictEqual(login({emailAddress: email, Pool: pool}, null), {type: LOGIN, payload: {}});
  });
});

describe('Sign Up Button Test' , () => {
  let component;
  let email = "1@purdue.edu";
  let pool = "abc"

  beforeEach(() => {
    component = renderComponent(SignupContent);
  });

  it('Test_Select_CallBack', () => {
    expect(component).to.exist;
  });

  it('Test_Callback_Function: email: '+ email + "  pool: "+pool, () => {
      assert.notStrictEqual(login({emailAddress: email, Pool: pool}, null), {type: LOGIN, payload: {}});
  });
});
