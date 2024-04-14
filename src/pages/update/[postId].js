import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Container, Typography } from "@mui/material";
import { useGetPostByIdQuery, useUpdatePostMutation } from "@/services/postApi";
import { postUpdated } from "@/features/posts/postsSlice";
import FormikForm from "@/components/FormikForm";

const UpdatePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const postId = query.postId;

  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  const [updatePost] = useUpdatePostMutation();

  const handleUpdatePost = async (values) => {
    try {
      const updatedPostData = {
        id: postId,
        title: values.title,
        body: values.body,
      };

      const { data } = await updatePost(updatedPostData).unwrap();
      // console.log("hi i am here/ and the ID = ", postId);
      // console.log("hi i am here/ and the data = ", data);
      // console.log("hi i am here/ and the post = ", post);
      // console.log("hi i am here/ and the updatedPostData = ", updatedPostData);
      dispatch(postUpdated({ data }));

      console.log("Done");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update post edfefefe:", error);
    }
  };

  if (isLoading) return <div>Loading... </div>;
  if (error) return <div>Error: {error.message} </div>;

  return (
    <Container>
      <Typography variant="h2">Update Post</Typography>
      {post && (
        <FormikForm
          buttonName="Update"
          onSubmit={handleUpdatePost}
          initValues={{ title: post.title, body: post.body }}
        />
      )}
    </Container>
  );
};

export default UpdatePage;
