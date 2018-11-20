const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("No token");
  try {
    const userData = jwt.verify(token, config.get("jwtKey"));
    req.user = userData;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
