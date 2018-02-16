import { renderComponent , expect } from '../test_helper';
import SearchBar from '../../src/containers/search_bar';

describe('Search_Bar Input Test' , () => {
  let component;
  const input1 = 'table';
  const input2 = 'black and white table clothes with animal details';

  beforeEach(() => {
    component = renderComponent(SearchBar, {term: input1}, {items: null, form: null});
  });

  it('test_search_bar_input', () => {
    expect(component).to.exist;
  });

  it('test_search_bar_input_length: ' + input1, () => {
    expect(component).to.have.lengthOf(1);
  });

  it('test_search_bar_input_length: ' + input2, () => {
    expect(component).to.have.lengthOf(1);
  });

});
