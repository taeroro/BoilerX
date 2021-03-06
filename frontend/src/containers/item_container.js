import React, { Component } from 'react';

export default class ItemContainer extends Component {
  renderImage() {
    const itemImgURL = this.props.itemInfo.imageURL;
    return (
      <img src={itemImgURL} width="180" height="180" alt=""
        className="itemImg"/>
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

  render() {
    return (
      <div>
        <div className="col-md-2">
          <div className="itemContainer">
            {this.renderImage()}
            {this.renderItemName()}
            {this.renderItemViews()}
            {this.renderPrice()}
          </div>
        </div>
      </div>
    );
  }
}
