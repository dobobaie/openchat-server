const Default = require("./default");
const users = require("./users");
const chat = require("./chat");

module.exports = (...args) =>
  Object.assign({}, Default(...args), users(...args), chat(...args));
