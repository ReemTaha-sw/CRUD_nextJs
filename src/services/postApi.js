import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostApi = createApi({
  reducerPath: "posts",
  tagTypes: ["posts", "postId"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    cache: "no-cache"
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ['posts']
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ['postId']
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['posts', 'postId'],

    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ['posts', 'postId']
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['posts', 'postId']
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = PostApi;
