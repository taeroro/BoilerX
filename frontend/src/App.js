import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { authUser, signOutUser } from "./libs/awsLib";

// non-pacakges
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import HomePage from "./components/home_page";
import SearchBar from './containers/search_bar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
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

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    const logoImgLink = "src/img/BoilerX_logo-01.svg";

    return (
      !this.state.isAuthenticating &&
      <div>
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <img src={logoImgLink} width="40" height="40" alt=""/>
              BoilerX
          </Link>
          <div className="navbar-nav">
            <SearchBar />
            <div className="buttonContainer">
              {this.state.isAuthenticated
                ? <button
                  className="nav-item"
                  id="bt-login"
                  onClick={this.handleLogout}>Logout</button>
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
