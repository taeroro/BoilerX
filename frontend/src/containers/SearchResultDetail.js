import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class SearchResultDetail extends Component {
  constructor(props) {
    super(props);

    // console.log(props);
    // this.state.itemID

    this.state = {
      itemID: props.match.params.id
    };
  }

  renderBacknTag() {
    const backImgLink = "../../src/img/left-arrow-angle-big-gross-symbol.svg";

    return (
      <div className="itemDetailTopBar">
        <Link className="backButton" to="/search">
          <img className="backBT-img" src={backImgLink} />
        </Link>
        <span className="backnTag">Back | Tags:</span>
      </div>
    );
  }

  render() {
    return (
      <div className="itemDetailPage">
        {this.renderBacknTag()}
      </div>
    );
  }
}

export default withRouter(SearchResultDetail);
