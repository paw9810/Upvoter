const db = require("../models");

exports.getUsers = (req, res) => {
  db.user.findAll().then((users) => res.send(users));
};
