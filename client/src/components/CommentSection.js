import React from "react";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  commentSection: {
    marginTop: 40,
  },
});

const CommentSection = ({ comments, getTopComments }) => {
  const classes = useStyles();
  if (comments === null) return null;
  return (
    <section className={classes.commentSection}>
      {comments.map((comment, i) => (
        <Comment key={i} data={comment} getTopComments={getTopComments} />
      ))}
    </section>
  );
};

export default CommentSection;
