import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// non-packages
import SearchBar from './search_bar';
// import ProfileButtons from '../components/elements/profile_buttons';

class TopNavBar extends Component {
  render() {
    const logoImgLink = "src/img/BoilerX_logo-01.svg";

    return (
      <nav className="navbar">
        <Link className="navbar-brand" to="/">
          <img src={logoImgLink} width="40" height="40" alt=""/>
            BoilerX
        </Link>
        <div className="navbar-nav">
          <SearchBar />
          {/* <ProfileButtons /> */}
        </div>
      </nav>
    );
  }
}

export default TopNavBar;
