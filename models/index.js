const Default = require("./default");
const users = require("./users");

module.exports = (...args) =>
  Object.assign({}, Default(...args), users(...args));
