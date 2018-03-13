import React, { Component } from "react";
import FadeIn from 'react-fade-in';
import { invokeApig } from "../libs/awsLib";

// non-packages
import SellItemContainer from '../containers/SellItemContainer';

class ListedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listedItems: null
    };
  }

  async componentDidMount() {
    try {
      const results = await this.fetchListedItems();
      this.setState({
        listedItems: results
      });
    } catch (e) {
      alert(e);
    }
  }

  fetchListedItems() {
    return invokeApig({
      path: "/user/items",
      method: "GET"
    });
  }

  render() {
    if (this.state.listedItems && this.state.listedItems.length == 0) {
      return (
        <div>
          No item.
        </div>
      );
    }

    return (
      <div className="sell-page-container col-sm-9">
        <div className="container-fluid cancelContainerFluidMargin">
          <div className="row">
            {this.state.listedItems &&
              <FadeIn>
                {this.state.listedItems.map((item, i) =>
                  <SellItemContainer
                    itemInfo={item}
                    key={item.itemID}
                  />
                )}
              </FadeIn>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ListedItems;
