import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import { API } from "../config";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/authContext";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  media: {
    height: 40,
    width: 40,
  },
  commentMargin: {
    marginTop: "10px",
  },
});

const Comment = ({ data, getTopComments }) => {
  const { userId } = useContext(AuthContext);
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const [answerVisible, setAnswerVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const profileImagePath = `${API}/media/profile/`;

  const handleAnswer = () => {
    setAnswerVisible(!answerVisible);
  };

  const handleChildren = async () => {
    try {
      const response = await axios.get(
        `/comments/getChildComments?postId=${data.postId}&parentComment=${data.id}`
      );
      if (response.data.length !== 0) setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/delete?commentId=${data.id}`, {
        withCredentials: true,
      });
      getTopComments(data.postId);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (form) => {
    try {
      const formData = {
        parentComment: data.id,
        text: form.text,
        userId: userId,
        postId: data.postId,
      };
      await axios.post("/comments/addComment", formData, {
        withCredentials: true,
      });
      await handleChildren();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box className={classes.commentMargin}>
      <Container maxWidth="sm">
        <Card>
          <Link
            component={Button}
            to={`/user/${data.user.name}`}
            size="small"
            color="secondary"
          >
            <CardMedia
              className={classes.media}
              image={profileImagePath + data.user.imageLocation}
              title="Paella dish"
            />
            <CardActions>
              <Typography variant="body1" component="span">
                {data.user.name}
              </Typography>
            </CardActions>
          </Link>
          {data.user.id === parseInt(userId) && (
            <Button onClick={handleDelete}>Delete</Button>
          )}
          <Divider />
          <CardContent>
            <Typography variant="body1" component="span">
              {data.text}
            </Typography>
          </CardContent>
          <Divider />
          {data.hasChildren && (
            <Button onClick={handleChildren}>Show answers</Button>
          )}
          <Button onClick={handleAnswer}>Answer</Button>
          {answerVisible && (
            <Container component="main" maxWidth="xs">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="text"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoComplete="text"
                      variant="outlined"
                      required
                      margin="normal"
                      fullWidth
                      name="text"
                      label="Comment"
                      id="text"
                      multiline
                      rows={2}
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add comment
                </Button>
              </form>
            </Container>
          )}

          <Divider />
          {comments.map((comment, i) => (
            <Comment key={i} data={comment} />
          ))}
        </Card>
      </Container>
    </Box>
  );
};

export default Comment;
