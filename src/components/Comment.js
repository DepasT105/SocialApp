import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import {deleteComment} from "../redux/actions/dataActions";
//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
// import { deleteComment } from "../redux/actions/dataActions";
//icons
import DeleteConfirm from '../util/DeleteConfirm';
const styles = theme => ({
  deletebtn: {
    position: "absolute",
    top: "0px",
    right: "0px"
  },
  card: {
    display: "flex",
    marginBottom: 5,
  },
  image: {
    minWidth: 100
  },
  content: {
    padding: 25,
    objectFit: "cover",
    position: "relative"
  }
});

class Comment extends Component {
 
  deleteComment = () => {
    this.props.deleteComment(this.props.comment.commentId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      comment: {
        body,
        createdAt,
        userImage,
        userHandle,
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const deleteButton =
      authenticated && handle === userHandle ? (
        <div className={classes.deletebtn}>
          <DeleteConfirm contentName="comment" handleSubmit={this.deleteComment}/>
        </div>
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />

        <CardContent className={classes.content}>
          {userHandle}
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
 deleteComment
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Comment));
//cont at 4:57:49
