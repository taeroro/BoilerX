import React, { Component } from 'react';

// non-packages
import PopularItems from '../../containers/pop_items';

export default class HomePage extends Component {
  render() {
    const artImgLink = "src/img/homePageArts.svg";

    return (
      <div>
        <PopularItems />
        <img className="homePageArts" src={artImgLink}/>
      </div>
    );
  }
}
