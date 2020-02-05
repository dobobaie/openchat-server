const utils = require("./utils");

module.exports = () => {
  const modules = {};
  modules.utils = utils;
  return modules;
};
