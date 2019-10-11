import {
  SET_POSTS,
  SET_POST,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  CREATE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../types";
import axios from "axios";

export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
      console.log(err);
    });
};

export const getPost = postId => dispatch => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/post/${postId}`)
    .then(res => {
      let postData = {
        body: res.data.postData.body,
        createdAt: res.data.postData.createdAt,
        userImage: res.data.postData.userImage,
        userHandle: res.data.postData.userHandle,
        likeCount: res.data.postData.likeCount,
        commentCount: res.data.postData.commentCount,
        comments: res.data.postData.comments,
        postId
      };

      dispatch({ type: SET_POST, payload: { ...postData } });
    })
    .catch(err => {
      dispatch({
        type: SET_POST,
        payload: {}
      });
    });
};

export const likePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
export const unlikePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deletePost = (postId,history) => dispatch => {
  // console.log(history);
  axios
    .delete(`/post/${postId}`)
    .then(res => {
      dispatch({ type: DELETE_POST, payload: { postId } });

  if (window.location.pathname !== "/") {
    history.push("/");
 
  }
    })
    .catch(err => {
      console.log(err);
    });

};

export const createPost = body => dispatch => {
  axios
    .post("/post", { body })
    .then(res => {
      dispatch({ type: CREATE_POST, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
export const addComment = (body, postId) => dispatch => {
  // console.log(`body = ${body}`);
  axios
    .post(`/post/${postId}/comment`, { body })
    .then(res => {
      dispatch({ type: ADD_COMMENT, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
export const deleteComment = (commentId) => dispatch=>{
axios.delete(`/comment/${commentId}`).then(res=>{
  dispatch({type:DELETE_COMMENT,payload:commentId});
}).catch(err => {
      console.log(err);
    });
}
