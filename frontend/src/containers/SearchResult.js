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

    var item_num = 0;
    this.props.searchItems.map(function(item) {
      if (item.name.toLowerCase().includes(this.props.searchTerm)) item_num++;
    }, this);

    if (item_num == 0) {
      return (
        <div>
          No item match the search term.
        </div>
      )
    }

    return (
        <div className="container-fluid">
          <div className="row">
            <FadeIn>
              {this.props.searchItems.map((item, i) =>
                item.name.toLowerCase().includes(this.props.searchTerm)
                ?
                <SearchPageItemContainer
                  itemInfo={item}
                  key={i}
                />
                :
                <div></div>
              )}
            </FadeIn>
          </div>
      </div>
    );
  }
}
