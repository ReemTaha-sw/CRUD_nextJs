import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useGetPostsQuery, useDeletePostMutation } from "@/services/postApi";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { postDeleted } from "@/features/posts/postsSlice";
import { useRouter } from "next/router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState({});

  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const handleDeleteClick = (postId) => {
    setOpenDeleteDialog((prevState) => ({
      ...prevState,
      [postId]: true,
    }));
    setPostIdToDelete(postId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postIdToDelete).unwrap();
      dispatch(postDeleted(postIdToDelete));
      setOpenDeleteDialog((prevState) => ({
        ...prevState,
        [postIdToDelete]: false,
      }));
      console.log("Done");
    } catch (error) {
      console.error("Failed to delete post:", error);
      setOpenDeleteDialog(false);
    }
  };

  const handleCloseDeleteDialog = (postId) => {
    setOpenDeleteDialog((prevState) => ({
      ...prevState,
      [postId]: false,
    }));
  };

  const handleEditPost = async (postId) => {
    try {
      router.push({ pathname: `/update/${postId}` });
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Dashboard
      </Typography>
      <Link href="/CreatePage" passHref>
        <Button variant="contained" color="inherit" startIcon={<AddIcon />}>
          Create New Page
        </Button>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .slice()
              .reverse()
              .map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ width: "100px", margin: "5px" }}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleEditPost(post.id, post.title, post.body)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ width: "100px", margin: "5px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(post.id)}
                    >
                      Delete
                    </Button>
                    <Dialog
                      open={openDeleteDialog[post.id] || false}
                      onClose={() => handleCloseDeleteDialog(post.id)}
                    >
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogContent>
                        Are you sure you want to delete this post?
                      </DialogContent>
                      <DialogActions>
                        <Button
                          sx={{ width: "100px", margin: "5px" }}
                          onClick={() => handleCloseDeleteDialog(post.id)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="error">
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Link href={`/post/${post.id}`} passHref>
                      <Button
                        sx={{ width: "100px", margin: "5px" }}
                        variant="contained"
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
