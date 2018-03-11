import React, { Component } from "react";
import FadeIn from 'react-fade-in';

import SearchPageItemContainer from "./SearchPageItemContainer";

export default class SearchResult extends Component {
  render() {
    if (this.props.searchItems.length == 0) {
      return (
        <div className="SearchPageContainer">
          No item
        </div>
      );
    }

    return (
        <div className="container-fluid">
          <div className="row">
            <FadeIn>
              {this.props.searchItems.map((item) =>
                <SearchPageItemContainer
                  itemInfo={item}
                  key={item.itemID}
                />
              )}
            </FadeIn>
          </div>
      </div>
    );
  }
}
