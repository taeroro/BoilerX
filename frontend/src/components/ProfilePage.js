import React, { Component } from "react";

import EditProfile from "../containers/EditProfile";
import ListedItems from "../containers/ListedItems";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addClass: 0,
      user: null
    };
  }

  handlePanelClicked = event => {
    switch (event.target.id) {
      case "bt-edit-profile":
        this.setState({ addClass: 0 });

        break;
      case "bt-sell-item":
        this.setState({ addClass: 1 });
        break;
    }
  }

  renderPanel() {
    return (
      <div className="side-panel col-sm-3">
        <button
          id="bt-edit-profile"
          className={this.state.addClass == 0
            ? "bt-profile-panel bt-panel-clicked" : "bt-profile-panel" }
          onClick={this.handlePanelClicked}>
          Edit Profile
        </button>
        <button
          id="bt-sell-item"
          className={this.state.addClass == 1
            ? "bt-profile-panel bt-panel-clicked" : "bt-profile-panel" }
          onClick={this.handlePanelClicked}>
          Listed Items (Sell)
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid profile-page-container">
        {this.renderPanel()}
        {this.state.addClass == 0 ? <EditProfile /> : <div></div> }
        {this.state.addClass == 1 ? <ListedItems /> : <div></div> }
      </div>
    );
  }
}

export default ProfilePage;
