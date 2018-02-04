import React, { Component } from 'react';

export default class SearchBar extends Component {
  /* constructor for the search bar */
  constructor(props) {
    super(props);

    this.state = { term: '' }; // init state prop

    // bind this to make functions work properly
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /* submit form function */
  onFormSubmit(event) {
    event.preventDefault();

    // TODO: go and fetch data
    this.setState({ term: '' });
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
