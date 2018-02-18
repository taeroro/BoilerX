import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class SearchPageItemContainer extends Component {
  renderImage() {
    // TODO: change this line when the item has url in DB
    const itemImgURL = "src/img/hilver-table__0307336_PE427543_S4.JPG";
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
    // const descr = this.props.itemInfo.descr;
    const descr = "This desk is made of bamboo which is a durable, renewable and sustainable material.";
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
            {this.renderTags()}
            {this.renderDescr()}
            {this.renderPrice()}
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(SearchPageItemContainer);
