import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FadeIn from 'react-fade-in';

import { S3_PREFIX_URL } from '../App';
import LoaderButton from "../components/LoaderButton";

class SearchResultDetail extends Component {
  constructor(props) {
    super(props);

    // console.log(props);
    // this.state.itemID

    this.state = {
      itemID: props.match.params.id,
      isLoading: false
    };
  }

  renderBackNTag() {
    const backImgLink = `${S3_PREFIX_URL}public_img/left-arrow-angle-big-gross-symbol.svg`;

    return (
      <div className="itemDetailTopBar">
        <Link className="backButton" to="/search">
          <img className="backBT-img" src={backImgLink} />
        </Link>
        <span className="backnTag">Back | Tags:</span>
      </div>
    );
  }

  renderImageGallery() {
    const imgLink = "../../src/img/hilver-table__0307336_PE427543_S4.JPG";

    return (
      <div className="galleryContainer col-lg-5">
        <img className="gallery-img" src={imgLink} />
      </div>
    );
  }

  renderTitleNDetail() {
    // TODO: GET single item by calling API function created by mushroom
    // TODO: Popluar item check and display

    const title = "Bamboo Table";
    const views = "2052" + " views";
    const roundedPrice = parseFloat(Math.round(32.99 * 100) / 100).toFixed(2);
    const price = "$ " + roundedPrice;

    return (
      <div className="title-n-detail col-lg-4">
        <h1 className="item-detail-title">{title}</h1>
        <div className="sub-title-container">
          <span className="detail-views">{views}</span>
          {/* TODO: display popluar item */}

        </div>
        <div className="price-n-buy-btn-container">
          <span className="detail-price">{price}</span>
          <LoaderButton
            className="buy-button"
            type="submit"
            isLoading={this.state.isLoading}
            text="Buy"
            loadingText="Loading..."
            id="submitButtonBuy"
          />
        </div>
      </div>
    );
  }

  renderSeller() {
    // TODO: update seller's userid & time
    const sellerImgLink = "https://images.unsplash.com/photo-1508034567015-5fa801984b94?ixlib=rb-0.3.5&s=d56d4832399fe7436535a92d90f06a51&auto=format&fit=crop&w=2000&q=80";
    const verifiedImgLink = `${S3_PREFIX_URL}public_img/Verified.png`;
    const sellerID = "userid";
    const sellerListDate = "Dec 12, 2017";

    return (
      <div className="item-detail-seller-container col-lg-3">
        <div className="seller-card-view">
          <div className="seller-card-container">
            <div className="seller-card-img-container">
              <img src={sellerImgLink} className="seller-card-img"/>
              <img src={verifiedImgLink} className="seller-card-verifed-img" />
            </div>
            <p className="seller-card-verifed-label">Verified User</p>
            <div className="seller-card-id-container">
              <p className="seller-card-id-n-date-label">Listed by:</p>
              <p className="seller-card-id">{sellerID}</p>
            </div>
            <div className="seller-card-id-container">
              <p className="seller-card-id-n-date-label">Listed on:</p>
              <p className="seller-card-date">{sellerListDate}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDescr() {
    const itemDescr = "This desk is made of bamboo which is a durable, renewable and sustainable material.";

    return (
      <div className="item-descr-container col-md-12">
        <h2 className="item-descr-label">Description: </h2>
        <p className="item-descr-body">{itemDescr}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid itemDetailPage">
        <FadeIn>
          {this.renderBackNTag()}
          <div className="itemDetailContainer row">
            {this.renderImageGallery()}
            {this.renderTitleNDetail()}
            {this.renderSeller()}
            {this.renderDescr()}
          </div>
        </FadeIn>
      </div>
    );
  }
}

export default withRouter(SearchResultDetail);
