import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addComment } from "../redux/actions/dataActions";

import Button from "@material-ui/core/Button";
import MyButton from "../util/MyButton";
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddIcon from "@material-ui/icons/Add";

class AddComment extends Component {
  state = {
    open: false,
    body: "",
    postId:""
  };
  mapToState = (postId) => {
    this.setState({
      postId: postId 
    });

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

  componentDidMount() {
    const {postId } = this.props;
    this.mapToState(postId);

  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
     console.log(`${this.state.body},${this.state.postId}`);
    this.props.addComment(this.state.body,this.state.postId);
    this.handleClose();
  };
  render() {

    return (
      <Fragment>
        <MyButton tip="Add a Comment" onClick={this.handleOpen}>
        <Typography color="primary">Post a Comment</Typography>
          <AddIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Post Comment</DialogTitle>
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
              Post Comment
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  // user: state.user,
  // ui: state.ui
});

export default connect(
  mapStateToProps,
  { addComment }
)(AddComment);
