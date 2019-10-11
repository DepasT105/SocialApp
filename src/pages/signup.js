import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import appIcon from "../images/logo.png";
// import axios from "axios";
//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
const styles = {
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
    maarginTop: 20
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword:"",
      handle: "",
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
    this.setState({ loading: true });
    const userData = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.signupUser(userData, this.props.history);

    // axios
    //   .post("/signup", userData)
    //   .then(result => {
    //     localStorage.setItem('FBIdToken' , `Bearer ${result.data.token}`);
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(err => {
    //     //console.log(err);
    //     console.log (err.response.data.errors);

    //     this.setState(
    //       {
    //       errors: err.response.data.errors,
    //       loading: false
    //     });
    //   });
  };
  handleChange = event => { 
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes} = this.props;
    const { errors } = this.state;

    return (

      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={appIcon} className={classes.image}  alt="App Icon"/>
          <Typography variant="h2" className={classes.title}>
            SignUp
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label={"Email"}
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="handle"
              label="handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  signupUser
};


export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
