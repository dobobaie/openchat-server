const utils = require("./utils");
const Users = require("./users");

module.exports = app => {
  const modules = {};
  modules.utils = utils;
  modules.users = new Users(app, modules);
  return modules;
};
