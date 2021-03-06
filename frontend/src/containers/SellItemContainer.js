import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class SellItemContainer extends Component {
  renderImage() {
    const itemImgURL = this.props.itemInfo.imageURL;
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
    return (
      <Link to={"/edit_item/" + this.props.itemInfo.itemID}>
        <button className="edit-item-btn" id="edit_item_btn">Edit</button>
      </Link>
    );
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

export default withRouter(SellItemContainer);
