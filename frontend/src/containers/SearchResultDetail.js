import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FadeIn from 'react-fade-in';
import AWS from "aws-sdk";

import { invokeApig } from "../libs/awsLib";
import { S3_PREFIX_URL } from '../App';
import LoaderButton from "../components/LoaderButton";


class SearchResultDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemID: props.match.params.id,
      item: null,
      buyerEmail: null,
      isLoading: false
    };

    this.sendEmail = this.sendEmail.bind(this);
  }

  async componentDidMount() {
    try {
      const results = await this.fetchItem();
      this.setState({ item: results });

      const results1 = await this.fetchBuyer();
      this.setState({ buyerEmail: results1.email });

      await this.updateViews();

    } catch (e) {
      alert(e);
    }
  }

  fetchItem() {
    return invokeApig({
      path: "/content/" + this.state.itemID,
      method: "GET"
    });
  }

  fetchBuyer() {
    return invokeApig({
      path: "/user/profile",
      method: "GET"
    });
  }

  updateViews() {
    return invokeApig({
      path: "/content/" + this.state.itemID + "/pop",
      method: "PUT"
    });
  }

  sendEmail() {
    // Load the AWS SDK for Node.js
    var AWS = require('aws-sdk');
    // Set the region
    AWS.config.update({region: 'us-east-1'});

    var sellerEmailAddr = this.state.item.sellerEmail;

    // Create sendEmail params
    var params = {
     Destination: { /* required */
       CcAddresses: [

         /* more items */
       ],
       ToAddresses: [
         sellerEmailAddr
         /* more items */
       ]
     },
     Message: { /* required */
       Body: { /* required */
         Html: {
          Charset: "UTF-8",
          Data: "Someone is interested in your " + this.state.item.name + " on BoilerX. Please contact: " + this.state.buyerEmail
         },
         Text: {
          Charset: "UTF-8",
          Data: "Someone is interested in your " + this.state.item.name + " on BoilerX. Please contact: " + this.state.buyerEmail
         }
        },
        Subject: {
         Charset: 'UTF-8',
         Data: 'Someone is interested in your posted item on BoilerX!'
        }
       },
     Source: 'schewshu@purdue.edu', /* required */
     ReplyToAddresses: [
         'schewshu@purdue.edu',
       /* more items */
     ],
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
     function(data) {
       alert("The seller has been notified via email with the your contact information!");
     }).catch(
       function(err) {
       console.error(err, err.stack);
     });

    return;
  }



  renderBackNTag() {
    const backImgLink = `${S3_PREFIX_URL}public_img/left-arrow-angle-big-gross-symbol.svg`;

    return (
      <div className="itemDetailTopBar">
        <Link className="backButton" to="/search">
          <img className="backBT-img" src={backImgLink} />
        </Link>
        <span className="backnTag">Back</span>
      </div>
    );
  }

  renderImageGallery() {
    const imgLink = "../../src/img/default_image.png";

    return (
      <div className="galleryContainer col-lg-5">
        <img className="gallery-img"
          src={
            this.state.item ? this.state.item.imageURL : imgLink
          }
        />
      </div>
    );
  }

  renderTitleNDetail() {
    return (
      <div className="title-n-detail col-lg-4">
        {this.state.item &&
          <div>
            <h1 className="item-detail-title">{this.state.item.name}</h1>
            <div className="sub-title-container">
              <span className="detail-views">{this.state.item.popularity + " views"}</span>
            </div>
            <div className="price-n-buy-btn-container">
              <span className="detail-price">{"$ " + parseFloat(Math.round(this.state.item.price * 100) / 100).toFixed(2)}</span>
              <LoaderButton
                className="buy-button"
                type="submit"
                isLoading={this.state.isLoading}
                text="Buy"
                loadingText="Loading..."
                id="submitButtonBuy"
                onClick={this.sendEmail}
              />
            </div>
          </div>
        }
      </div>
    );
  }

  renderSeller() {
    // const sellerImgLink = "https://images.unsplash.com/photo-1508034567015-5fa801984b94?ixlib=rb-0.3.5&s=d56d4832399fe7436535a92d90f06a51&auto=format&fit=crop&w=2000&q=80";
    const verifiedImgLink = `${S3_PREFIX_URL}public_img/Verified.png`;
    const sellerListDate = "Dec 12, 2017";

    return (
      <div className="item-detail-seller-container col-lg-3">
        <div className="seller-card-view">
          <div className="seller-card-container">
            <div className="seller-card-img-container">
              <img src=
                {this.state.item ? this.state.item.sellerImg : <div></div> }
                className="seller-card-img"/>
              <img src={verifiedImgLink} className="seller-card-verifed-img" />
            </div>
            <p className="seller-card-verifed-label">Verified User</p>
            <div className="seller-card-id-container">
              <p className="seller-card-id-n-date-label">Listed by:</p>
              <p className="seller-card-id">
                {this.state.item ? this.state.item.sellerName : "Loading..." }
              </p>
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
    // const itemDescr = "This desk is made of bamboo which is a durable, renewable and sustainable material.";

    return (
      <div className="item-descr-container col-md-12">
        <h2 className="item-descr-label">Item Description: </h2>
        <p className="item-descr-body">{this.state.item
          ?
            this.state.item.descr == null ? "Unavailable" : this.state.item.descr
          :  "Loading..." }</p>
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
