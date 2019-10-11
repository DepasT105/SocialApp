import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Mateial UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MyButton from "../util/MyButton";
import { connect } from "react-redux";
import {logoutUser} from '../redux/actions/userActions'

import AccountIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import AddPost from "./AddPost";

class Navbar extends Component {

  handleLogout = () =>{
    this.props.logoutUser();
    };
  render() {
    const { authenticated ,credentials :{handle}} = this.props.user;
    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar className="nav-container">
            {authenticated ? (
              <Fragment>
                     <MyButton tip="Logout" onClick={this.handleLogout}>
                  <LogoutIcon color="primary"></LogoutIcon>
                </MyButton>
                <Link to={`/users/${handle}`}>
                <MyButton tip="My Profile">
                  <AccountIcon color="primary"></AccountIcon>
                </MyButton>
                </Link>
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon color="primary" />
                  </MyButton>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                {/* <Button color="inherit" component = {Link} to="/">Home</Button> */}
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}
const mapStateToProp = state => ({
  user: state.user
});

Navbar.propTypes = {
  user: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProp,{logoutUser})(Navbar);
