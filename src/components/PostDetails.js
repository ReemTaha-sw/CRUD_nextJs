import { Container, Typography, Paper } from "@mui/material";

const PostDetailsComponent = ({ post }) => {
  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "1rem" }}>
        <Typography variant="h4" gutterBottom>
          Post Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          ID: {post.id}
        </Typography>
        <Typography variant="h6" gutterBottom>
          userId: {post.userId}
        </Typography>
        <Typography variant="h6" gutterBottom>
          reactions: {post.reactions}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
          {post.body}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PostDetailsComponent;
