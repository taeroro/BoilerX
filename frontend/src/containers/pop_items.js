import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { invokeApig } from "../libs/awsLib";

// non-packages
import ItemContainer from '../containers/item_container';

class PopularItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popItems: null
    };
  }

  async componentDidMount() {
    try {
      const results = await this.fetchPopItems();
      this.setState({
        popItems: results
      });
    } catch (e) {
      alert(e);
    }
  }

  /* invoke api */
  fetchPopItems() {
    return invokeApig({
      path: "/content",
      method: "GET"
    });
  }

  render() {
    return (
      <div className="popContainer">
        <h1>Popular Items on BoilerX :</h1>
        <div className="container-fluid">
          <div className="row">
            {this.state.popItems &&
              <FadeIn>
                {this.state.popItems.map((item, i) =>
                  i < 5 ?
                  <ItemContainer
                    itemInfo={item}
                    key={item.itemID}
                  /> : <div key="0"></div>
                )}
              </FadeIn>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PopularItems;
