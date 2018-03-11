import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar, DropdownButton, MenuItem } from "react-bootstrap";
import { authUser, signOutUser } from "./libs/awsLib";

// non-pacakges
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import HomePage from "./components/home_page";
import SearchBar from "./containers/search_bar";

export const S3_PREFIX_URL = 'https://s3.amazonaws.com/boilerx-app/';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      searchItems: [],
      searchTerm: ""
    };
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  // use the data passed from searchBar
  searchTermCallback = searchItems => {
    this.setState({ searchItems: searchItems });
  }

  termCallBack = searchTerm => {
    console.log(searchTerm);
    this.setState({ searchTerm: searchTerm });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      searchItems: this.state.searchItems,
      searchTerm: this.state.searchTerm
    };
    const logoImgLink = `${S3_PREFIX_URL}public_img/BoilerX_logo-01.svg`;

    return (
      !this.state.isAuthenticating &&
      <div>
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <img src={logoImgLink} width="40" height="40" alt=""/>
              <span className={this.props.location.pathname == "/"
              ? "brandAppear" : "brandDisappear"}>BoilerX</span>
          </Link>
          <div className="navbar-nav">
            <SearchBar
              isHomePage={this.props.location.pathname == "/" ? true : false}
              callbackFromParent={this.searchTermCallback}
              callbackFromParent1={this.termCallBack}
            />
            <div className="buttonContainer">
              {this.state.isAuthenticated
                // ? <button
                //   className="nav-item"
                //   id="bt-login"
                //   onClick={this.handleLogout}>Logout</button>
                ? <DropdownButton
                    title="Profile"
                    key="0" id="dropdown-basic-0" noCaret pullRight>
                    <MenuItem eventKey="1">
                      <RouteNavItem key={3} href="/profile" id="bt-profile">
                        Profile & Items
                      </RouteNavItem>
                    </MenuItem>
                    <MenuItem eventKey="2" onClick={this.handleLogout}>
                      Logout
                    </MenuItem>
                  </DropdownButton>
                : [
                    <RouteNavItem key={2} href="/login" id="bt-login">
                      Login
                    </RouteNavItem>,
                    <RouteNavItem key={1} href="/signup" id="bt-signup">
                      Signup
                    </RouteNavItem>
                  ]}
            </div>
          </div>
        </nav>
        <Routes childProps={childProps} />
      </div>
    )
  }
}

export default withRouter(App);
