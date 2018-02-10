import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchItem } from '../actions/index';

class SearchBar extends Component {
  /* constructor for the search bar */
  constructor(props) {
    super(props);

    this.state = { term: '' }; // init state prop

    // bind this to make functions work properly
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /* submit form function */
  onFormSubmit(event) {
    event.preventDefault();

    // TODO: go and fetch data
    this.setState({ term: '' });
    this.props.fetchItem(this.state.term)
  }

  /* change search bar value as user type */
  onInputChange(event) {
    this.setState({ term: event.target.value});
  }

  /* render function */
  render() {
    return (
      <div className="nav-item searchBar-container">
          <form onSubmit={this.onFormSubmit} className="input-group">
              <input
                placeholder="Search something..."
                className="form-control"
                value={this.state.term}
                onChange={this.onInputChange}/>
          </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchItem}, dispatch);
}

export default connect (null, mapDispatchToProps)(SearchBar);
