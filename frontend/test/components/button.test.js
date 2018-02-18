import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

import Login from '../../src/containers/Login';
import Signup from '../../src/containers/Signup';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe('Login Button Test' , () => {

  let email = "1@purdue.edu";
  let pool = "abc";
  let LOGIN = 'LOGIN';

  const handleSubmit = jest.fn();

  const wrapper = mount(
    <Login handleSubmit={handleSubmit}/>
  );

  const p = wrapper.find('.SubmitButton loginBtn');

  it('Test_Select_CallBack', () => {
    expect(p).toExist;
  });

  const form = wrapper.find('.form');
  const wrapper1 = shallow(<form onSubmit={handleSubmit}/>);
  wrapper1.simulate('submit');

  it('Test_Callback_Function: email: '+ email + "  pool: "+pool, () => {
    expect(handleSubmit).toBeCalled;
  });

});

describe('Sign Up Button Test' , () => {
  let component;
  let email = "1@purdue.edu";
  let pool = "abc"

  const handleSubmit = jest.fn();

  const wrapper = mount(
    <Signup handleSubmit={handleSubmit}/>
  );

  const p = wrapper.find('.SubmitButton signupBtn');

  it('Test_Select_CallBack', () => {
    expect(p).toExist;
  });

  const form1 = wrapper.find('.form');
  const wrapper1 = shallow(<form1 onSubmit={handleSubmit}/>);
  wrapper1.simulate('submit');

  it('Test_Callback_Function: email: '+ email + "  pool: "+pool, () => {
    expect(handleSubmit).toBeCalled;
  });

});
