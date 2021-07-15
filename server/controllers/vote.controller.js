const voteService = require("../services/vote.service");

exports.vote = async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const upvote = req.body.upvote;
    const isVoted = await voteService.isAlreadyVoted(userId, postId);
    const voteType = isVoted.voteType;
    const voteId = isVoted.voteId;
    if (voteType === null) {
      upvote
        ? await voteService.createVote("up", userId, postId)
        : await voteService.createVote("down", userId, postId);
      res.status(201).send("success");
    } else if (voteType === "down") {
      upvote
        ? await voteService.updateVote("up", voteId, postId)
        : res.status(400).send("already voted");
      res.status(201).send("success");
    } else if (voteType === "up") {
      upvote
        ? res.status(400).send("already voted")
        : await voteService.updateVote("down", voteId, postId);
      res.status(201).send("success");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send("user already voted");
  }
};
