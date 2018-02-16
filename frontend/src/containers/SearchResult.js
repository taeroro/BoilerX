import React, { Component } from "react";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  render() {
    return (
      <div>Search results</div>
    );
  }
}
