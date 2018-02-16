import React, { Component } from "react";

import SearchPageItemContainer from "./SearchPageItemContainer";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);

    console.log(props.searchItems);

    this.state = {
      isLoading: false
    };
  }

  render() {
    return (
      <div>
        Search results
        <SearchPageItemContainer />
      </div>
    );
  }
}
