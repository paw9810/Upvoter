const commentService = require("../services/comment.service");
const jwtDecode = require("jwt-decode");

exports.addComment = async (req, res) => {
  try {
    const parentComment = req.body.parentComment;
    const text = req.body.text;
    const userId = req.body.userId;
    const postId = req.body.postId;

    await commentService.addComment(parentComment, userId, postId, text);

    res.status(201).send("success");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getTopComments = async (req, res) => {
  try {
    const postId = req.query.postId;

    const result = await commentService.getTopComments(postId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getChildComments = async (req, res) => {
  try {
    const postId = req.query.postId;
    const parentComment = req.query.parentComment;

    const result = await commentService.getChildComments(postId, parentComment);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.query.commentId;
    const refreshToken = req.cookies.JWTREFRESH;
    const decoded = jwtDecode(refreshToken);
    await commentService.deleteComment(commentId, decoded.id);
    res.sendStatus(200);
  } catch (err) {
    if (err.message === "unauthorized") {
      res.sendStatus(403);
    }
    res.status(400).send(err.message);
  }
};
