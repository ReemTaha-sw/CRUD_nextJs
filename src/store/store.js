import { configureStore } from "@reduxjs/toolkit";
import { PostApi } from "@/services/postApi";
import postsSlice from "@/features/posts/postsSlice";

export const store = configureStore({
    reducer: {
    post: postsSlice,
      [PostApi.reducerPath]: PostApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(PostApi.middleware),
});
