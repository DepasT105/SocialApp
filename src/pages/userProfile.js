import React, { Component, Fragment } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Profile from "../components/Profile";
import UserProfileInfo from "../components/UserProfileInfo";

import { getPosts } from "../redux/actions/dataActions";

import Post from "../components/Post";
import axios from "axios";
const styles = {

};

class userProfile extends Component {
  constructor() {
    super();
    this.state = {
      handle: null,
      userInfo: {},
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.getPosts();

    this.getUserProfile(userId);
  }

  getUserProfile = uHandle => {
    axios
      .get(`/user/${uHandle}`)
      .then(res => {
        if (res.error) {
          this.setState({
            error: res.data.error
          });
        } else {
          this.setState({
            userInfo: {
              website: res.data.user.website,
              bio: res.data.user.bio,
              imageUrl: res.data.user.imageUrl,
              location: res.data.user.location,
              createdAt: res.data.user.createdAt,
              handle: uHandle
            },
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  };

  render() {
    // const { classes } = this.props;
    const {
      credentials: { handle }
    } = this.props.user;

    const { loading, userInfo } = this.state;

    const { userId } = this.props.match.params;

    const { dataLoading, posts } = this.props.data;

    const userPosts = posts.filter((post)=>post.userHandle === userId);
    let recentPostsMarkup = !dataLoading ? (
      userPosts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <p>Loading....</p>
    );
    let profileMarkup =
      userId === handle ? (
        <Profile />
      ) : (
        <UserProfileInfo userHandle={userId} userInfo={userInfo} />
      );

    return loading ? <p>Loading...</p> : <Fragment>
      {profileMarkup}
      <br/>
      {recentPostsMarkup}
    </Fragment>;
  }
}

userProfile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userId: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToUser = state => ({
  user: state.user,
  data: state.data
});

export default connect(
  mapStateToUser,
  { getPosts }
)(withStyles(styles)(userProfile));
