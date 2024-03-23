import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts";
import editIdReducer from "./editId";
import authReducer from "./auth";
import postReducer from "./post";

export default configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    editId: editIdReducer,
    auth: authReducer
  }
})