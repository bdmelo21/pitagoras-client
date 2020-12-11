import React from "react";
import "bulma/css/bulma.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import AuthService from "../utils/auth";

class NavBar extends React.Component {
  logoutUser = () => {
    const authService = new AuthService();
    authService.logout().then(() => {
      this.props.setCurrentUser(null);
      localStorage.removeItem("loggedInUser");
    });
  };
  render() {
    if (this.props.loggedInUser) {
      return (
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="navbar-brand">
            <a
              href="/#"
              role="button"
              class="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarBasicExample" class="navbar-menu">
            <div class="home-wrapper">
              <div class="navbar-start">
                <div className="home-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <NavLink to="/dashboard" className="navbar-item">
                  Home
                </NavLink>
              </div>
            </div>
            <div className="div-username">
              <div className="home-icon-student">
                <FontAwesomeIcon icon={faUserGraduate} />
              </div>
              <h1 className="h1-username">
                Hello, {this.props.loggedInUser.username}
              </h1>
            </div>
            <div class="home-wrapper">
              <div class="navbar-end">
                <div className="home-icon">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
                <NavLink
                  to="/"
                  onClick={this.logoutUser}
                  className="navbar-item"
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      return null;
    }
  }
}
export default NavBar;
