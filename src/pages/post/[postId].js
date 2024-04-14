import React from "react";
import { useRouter } from "next/router";
import PostDetails from "../DetailsPage";

const PostDetailsPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      <h1>Post Details</h1>
      <PostDetails postId={postId} />
    </div>
  );
};

export default PostDetailsPage;
