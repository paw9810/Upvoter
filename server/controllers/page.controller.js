const pageService = require("../services/page.service");

exports.getPage = async (req, res) => {
  try {
    const page = req.params.page;
    const posts = await pageService.getPage(page);

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
