const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../../models");

router.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  //const validPassword = await bcrypt.compare(password, user[0].password);

  const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, {
    expiresIn: 20,
  });
  const refreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 525600,
  });

  //CSRF
  res.cookie("JWT", accessToken, {
    maxAge: 86400000,
    httpOnly: true,
  });
  res.send({ accessToken, refreshToken });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  // TODO: check if refreshToken exists in DB
  try {
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.sendStatus(403);
  }

  const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.send({ accessToken });
});

module.exports = router;
