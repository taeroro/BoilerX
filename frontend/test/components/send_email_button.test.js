import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

import Login from '../../src/containers/Login';
import Signup from '../../src/containers/Signup';
//import SearchResultDetail from '../../src/containers/SearchResultDetail';
import sendEmail from './sendEmail';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe('Buy Button Test' , () => {
  let component;
  let email = "1@purdue.edu";
  let pool = "abc"

  const buyButton = jest.fn();

  const wrapper = mount(
    <Signup handleSubmit={buyButton}/>
  );

  const p = wrapper.find('.SubmitButton signupBtn');

  it('Test_Select_CallBack', () => {
    expect(p).toExist;
  });

   sendEmail();

   const form1 = wrapper.find('.form');
   const wrapper1 = shallow(<form1 onSubmit={buyButton}/>);
   wrapper1.simulate('submit');

   it('Test_Callback_Function: email: '+ email + "  pool: "+pool, () => {
     expect(buyButton).toBeCalled;
   });
});
