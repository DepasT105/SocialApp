import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import appIcon from "../images/logo.png";
// import axios from "axios";
//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
const styles = {
  signup: {
    color: "secondary",
float:"right"  
  },
  image: {
    margin: "20px auto 20px auto"
  },
  form: {
    textAlign: "center"
  },
  title: {
    margin: "auto auto 20px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    maarginTop: 20,
    float: "center"
  },

};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({
        errors: nextProps.ui.errors
      });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      classes,
      // ui: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={appIcon} className={classes.image}  alt="App Icon"/>
          <Typography variant="h2" className={classes.title}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <span>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            <Link to ='/signup'>
            <Typography
                variant="body2"
                color="primary"
                className={classes.signup}
              >
                Signup
              </Typography>
            </Link>
            </span>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
