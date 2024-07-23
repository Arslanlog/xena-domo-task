const user = require("express").Router();
const { getUser } = require("./user");
user.get("/", getUser);
module.exports = user;