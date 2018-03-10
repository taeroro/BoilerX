import React, { Component } from "react";

export default class SellItemContainer extends Component {
  renderImage() {
    // TODO: change this line when the item has url in DB
    const itemImgURL = "src/img/hilver-table__0307336_PE427543_S4.JPG";
    return (
      <img src={itemImgURL} alt="" className="sellItemImg"/>
    );
  }

  renderItemName() {
    const name = this.props.itemInfo.name;
    return (<p className="itemName">{name}</p>);
  }

  renderItemViews() {
    const views = this.props.itemInfo.popularity + " views";
    return (<span className="itemViews">{views}</span>);
  }

  renderPrice() {
    const roundedPrice = parseFloat(Math.round(this.props.itemInfo.price * 100) / 100).toFixed(2);
    const price = "$" + roundedPrice;
    return (<span className="itemPrice">{price}</span>);
  }

  renderEditBtn() {
    return (<button className="edit-item-btn">Edit</button>);
  }

  render() {
    return (
      <div>
        <div className="col-md-4">
          <div className="sellItemContainer">
            {this.renderImage()}
            {this.renderItemName()}
            {this.renderItemViews()}
            {this.renderPrice()}
            {this.renderEditBtn()}
          </div>
        </div>
      </div>
    );
  }
}
