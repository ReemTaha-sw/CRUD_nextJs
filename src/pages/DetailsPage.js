import React from "react";
import { useRouter } from "next/router";
import { useGetPostByIdQuery } from "@/services/postApi";
import PostDetailsComponent from "@/components/PostDetails";

const PostDetails = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!post) {
    return <div>No post found.</div>;
  }
  return <PostDetailsComponent post={post} />;
};

export default PostDetails;
