const userService = require("../services/user.service");
exports.getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userService.getUser(username);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
