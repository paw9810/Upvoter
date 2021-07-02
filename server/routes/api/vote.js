const express = require("express");
const db = require("../../models");
const authenticate = require("../../auth");

const router = express.Router();

router.get("/all", authenticate, (req, res) => {
  //db.user.findAll().then((users) => res.send(users));
  res.status(200).send("ladzia");
});

module.exports = router;
