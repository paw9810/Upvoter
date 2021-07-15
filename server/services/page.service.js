const db = require("../models");

exports.getPage = async (page = 1) => {
  const PAGE_SIZE = 5;
  const skip = (page - 1) * PAGE_SIZE;
  const result = await db.post.findAll({
    attributes: ["id", "title", "location", "tags", "rating", "createdAt"],
    include: [
      {
        model: db.user,
        attributes: ["id", "name", "imageLocation"],
      },
    ],
    order: [["createdAt", "DESC"]],
    offset: skip,
    limit: PAGE_SIZE,
  });
  let count = await db.post.count();
  count = Math.ceil(count / 5);
  return [result, count];
};
