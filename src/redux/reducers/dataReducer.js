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

const inistialState = {
  posts: [],
  post: {},
  dataLoading: false,
  error: false
};

export default function(state = inistialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        dataLoading: true
      };
    case SET_POSTS:
      return {
        ...state,
        posts: actions.payload,
        dataLoading: false
      };

    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === actions.payload.postId
      );
      state.posts[index] = actions.payload;

      return {
        ...state
      };

    case CREATE_POST:
      state.posts.unshift({
        postId: actions.payload.postId,
        body: actions.payload.body,
        userHandle: actions.payload.userHandle,
        createdAt: actions.payload.createdAt,
        userImage: actions.payload.userImage,
        likeCount: actions.payload.likeCount,
        commentCount: actions.payload.commentCount
      });
      return {
        ...state
      };

    case DELETE_POST:
      //also delete likes and comments
      return {
        ...state,
        posts: state.posts.filter(
          post => post.postId !== actions.payload.postId
        )
      };
    case SET_POST:
      return {
        ...state,
        post: actions.payload,
        dataLoading: false
      };
    case ADD_COMMENT:
      state.post.comments.unshift({
        body: actions.payload.body,
        createdAt: actions.payload.createdAt,
        postId: actions.payload.postId,
        userHandle: actions.payload.userHandle,
        userImage: actions.payload.userImage,
        commentId: actions.payload.commentId
      });

      return {
        ...state,
        post: { ...state.post, commentCount: state.post.commentCount + 1 }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment.commentId !== actions.payload
          ),
          commentCount: state.post.commentCount - 1
        }
      };
    default:
      return state;
  }
}
