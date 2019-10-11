import React, { Component,Fragment } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types';

import Post from "../components/Post";
import Profile from '../components/Profile'

import {connect} from 'react-redux';
import {getPosts} from '../redux/actions/dataActions';
import AddPost from "../components/AddPost";

import Typography from "@material-ui/core/Typography"

// import { BrowserRouter, Route, Switch } from "react-router-dom"; //install them
// import AuthRoute from "./util/AuthRoute";

class home extends Component {

  // If you need to load data from a remote endpoint,
  // this is a good place to instantiate the network request.
  componentDidMount() {
    this.props.getPosts(); 
  }

  render() {
    const {posts, dataLoading} = this.props.data;
    const {user:{authenticated}}=this.props;
    let recentPostsMarkup = !authenticated ? (this.props.history.push("/login"))  :(!dataLoading ? (
      posts.map(post => <Post key={post.postId} post={post}/>)
    ) : 
    <div class="loader" ></div>
    )
    ; 
    return (
     <Fragment>
       <Typography variant="h3" color="primary" style={{textAlign:"center"}}>Home</Typography>
 <Grid container spacing={2} >
        <Grid item sm={10}   xs={12}> 
        <AddPost/>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={2} xs={12} >
{/* <Profile/>     */}
   </Grid>
      </Grid>
     </Fragment>

    );
  }
}
home.propTypes = {
   getPosts :PropTypes.func.isRequired,
   data: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  user:state.user,
   data: state.data
})
export default connect(mapStateToProps, {getPosts})(home);
