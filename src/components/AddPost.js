import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createPost } from "../redux/actions/dataActions";

import Button from "@material-ui/core/Button";
import MyButton from "../util/MyButton";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

class AddComment extends Component {
  state = {
    open: false,
    body: ""
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    this.props.createPost(this.state.body);
    this.handleClose();
  };
  render() {
    return (
      <Fragment>
        <MyButton tip="Add a Post" onClick={this.handleOpen}>
          <Typography color="primary">Add a Post</Typography>
          <AddIcon color="primary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Write Post</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="body"
                type="body"
                label="Body"
                placeholder="Content"
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddComment.propTypes = {
  createPost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  // user: state.user,
  // ui: state.ui
});

export default connect(
  mapStateToProps,
  { createPost }
)(AddComment);
