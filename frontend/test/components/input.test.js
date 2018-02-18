import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import SearchBar from '../../src/containers/search_bar';


describe('Search_Bar Input Test' , () => {
  const input1 = 'table';
  const input2 = 'black and white table clothes with animal details';

  const searchTermCallback = jest.fn();
  const wrapper = shallow(
    <SearchBar isHomePage={true} callbackFromParent={searchTermCallback}/>
  );

  const p = wrapper.find('.form-control searchBar');

  it('test_search_bar_input', () => {
    expect(wrapper).toExist;
  });

  p.value = input1;

  it('test_search_bar_input_length: ' + input1, () => {
    expect(p.value).toBe(input2);
  });

  p.value = input2;
  it('test_search_bar_input_length: ' + input2, () => {
    expect(p.value).toBe(input2);
  });

  const onFormSubmit = jest.fn();
  const form = wrapper.find('.form');
  const wrapper1 = shallow(<form onSubmit={onFormSubmit}/>);
  wrapper1.simulate('submit');

  it('test_search_bar_formSubmit: ', () => {
    expect(onFormSubmit).toBeCalled;
  });


});
