const db = require("../models");

exports.getPage = async (page = 1) => {
  const PAGE_SIZE = 5;
  const skip = (page - 1) * PAGE_SIZE;
  const result = await db.post.findAll({
    attributes: ["title", "location", "tags", "rating", "createdAt"],
    include: [
      {
        model: db.user,
        attributes: ["name", "imageLocation"],
      },
    ],
    order: [["updatedAt", "DESC"]],
    offset: skip,
    limit: PAGE_SIZE,
  });
  return result;
};
