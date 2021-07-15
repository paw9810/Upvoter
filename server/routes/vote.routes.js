const express = require("express");
const voteController = require("../controllers/vote.controller");
const authenticate = require("../utils/auth");

const router = express.Router();

router.post("/vote", authenticate, voteController.vote);

module.exports = router;
