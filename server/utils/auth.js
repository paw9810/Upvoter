const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  const token = req.cookies.JWT;

  if (token === undefined) return res.status(403).send("Forbidden");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("invalid access token");

    req.user = user;
    next();
  });
};

module.exports = authenticate;
