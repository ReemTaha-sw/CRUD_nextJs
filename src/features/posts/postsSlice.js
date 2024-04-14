import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload);
    },
    postUpdated(state, action) {
      const { id, title, body } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    postDeleted(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
