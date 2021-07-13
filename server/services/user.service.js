const db = require("../models");

exports.getUser = async (username) => {
  const user = await db.user.findOne({
    attributes: ["name", "karma", "imageLocation"],
    where: { name: username },
  });
  if (user === null) {
    throw new Error("no user found");
  }
  return user;
};
