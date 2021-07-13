const express = require("express");
const pageController = require("../controllers/page.controller");
const pageService = require("../services/page.service");

const router = express.Router();

router.get("/:page?", pageController.getPage);

module.exports = router;
