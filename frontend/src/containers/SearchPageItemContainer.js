import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class SearchPageItemContainer extends Component {
  renderImage() {
    const itemImgURL = this.props.itemInfo.imageURL;
    return (
      <img src={itemImgURL} width="280" height="280" alt=""
        className="SPItemImg"/>
    );
  }

  renderItemName() {
    const name = this.props.itemInfo.name;
    return (<p className="SPItemName">{name}</p>);
  }

  renderTags() {
    const tagName = this.props.itemInfo.category;
    return (
      <div className="SPItemTag">
        <span className="SPItemTagName">{tagName}</span>
      </div>
    );
  }

  renderDescr() {
    const descr = this.props.itemInfo.descr;
    return (<p className="SPItemDescr">{descr}</p>);
  }

  renderPrice() {
    const roundedPrice = parseFloat(Math.round(this.props.itemInfo.price * 100) / 100).toFixed(2);
    const price = "$" + roundedPrice;
    return (<p className="SPItemPrice">{price}</p>);
  }

  render() {
    return (
      <div className="col-md-4">
        <Link className="SPItemContainerAni" to={"/search/" + this.props.itemInfo.itemID}>
          <div className="SPItemContainer">
            {this.renderImage()}
            {this.renderItemName()}
            {/* {this.renderTags()} */}
            {this.renderDescr()}
            {this.renderPrice()}
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(SearchPageItemContainer);
