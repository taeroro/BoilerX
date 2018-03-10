import React, { Component } from 'react';

// non-packages
import PopularItems from '../containers/pop_items';
import { S3_PREFIX_URL } from '../App';

class HomePage extends Component {
  render() {
    const artImgLink = `${S3_PREFIX_URL}public_img/homePageArts.svg`;

    return (
      <div>
        <PopularItems />
        <img className="homePageArts" src={artImgLink}/>
      </div>
    );
  }
}

export default HomePage;
