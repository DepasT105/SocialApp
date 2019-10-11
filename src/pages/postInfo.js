import React, { Component, Fragment } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Post from "../components/Post";
import { connect } from "react-redux";
import { getPost } from "../redux/actions/dataActions";

import AddComment from "../components/AddComment";

import Comment from "../components/Comment";

const styles = theme => ({
  addButton: {
    align: "right"
  }
});

class postInfo extends Component {


  componentWillMount() {
    const { postId } = this.props.match.params;
    this.props.getPost(postId);
  }

  

  render() {
    // const { classes } = this.props;
    const { postId } = this.props.match.params;
    const { loading, post } = this.props.data;
    const { authenticated } = this.props.user;
    const commentsMarkup =
      !loading && post.comments ? (
        post.comments.map(comment => <Comment key={comment.commentId} comment={comment} />)
      ) : (
        <p>...Loading</p>
      );

    const addComment = authenticated ? <AddComment postId={postId} /> : null;

    return !loading && post ? (
      <Fragment>
        <Post key={postId} post={post} history={this.props.history}></Post>{" "}
        {addComment}
        {commentsMarkup}
      </Fragment>
    ) : (
      <p>...Loading</p>
    );
  }
}

postInfo.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};
const mapStateToUser = state => ({
  data: state.data,
  user: state.user
});

export default connect(
  mapStateToUser,
  { getPost }
)(withStyles(styles)(postInfo));
