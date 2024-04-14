import { Container, Typography } from "@mui/material";
import { useCreatePostMutation } from "@/services/postApi";
import { useDispatch } from "react-redux";
import { postAdded } from "../features/posts/postsSlice";
import { useRouter } from "next/router";
import FormikForm from "@/components/FormikForm";

const CreatePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostMutation();
  const handleCreatePost = async (formData) => {
    try {
      const { data } = await createPost(formData).unwrap();
      dispatch(postAdded(data));
      console.log("Post created successfully:", data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  if (isCreating) return <p>Creating post...</p>;
  if (createError) return <p>Error creating post: {createError.message}</p>

  return (
    <Container>
      <Typography variant="h2">Create Post</Typography>
      <FormikForm
        onSubmit={handleCreatePost}
        initValues={{ title: "", body: "" }}
        buttonName="Create"
      />

    </Container>
  );
};

export default CreatePage;
