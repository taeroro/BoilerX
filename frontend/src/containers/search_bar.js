import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { invokeApig } from "../libs/awsLib";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.isHomePage == true) this.setState({ term: '' });
  }

  /* submit form function */
  onFormSubmit = async event => {
    event.preventDefault();

    if (this.state.term.length > 0) {
      try {
        const results = await this.fetchItem(this.state.term);
        this.props.callbackFromParent(results);
        this.props.history.push("/search");
      } catch (e) {
        alert(e);
      }
    }
    else alert("Please enter some keywords!");
  }

  /* invoke api */
  fetchItem(term) {
    return invokeApig({
      path: "/content",
      method: "GET",
    });
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
                className="form-control searchBar"
                id = "searchBar"
                value={this.state.term}
                onChange={this.onInputChange}/>
          </form>
      </div>
    );
  }
}

export default withRouter(SearchBar);
