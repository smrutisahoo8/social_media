const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    case "RETREIVING_SUCCESS":
      return {
        ...state,
        posts: action.data,
      };
    case "ADD_COMMENT_TO_POST": 
    const newComment = action.data;
    const existingPosts = state.posts;
    const searchedPost = existingPosts.find((post) => post._id === newComment.postId);
    if (searchedPost) {
        searchedPost.comments.push({userName: newComment.user, comment: newComment.comment});
    }
    return {
        ...state,
        posts: existingPosts,
      };
    default:
      return state;
  }
};

export default postReducer;
