const utils = require("./utils");
const Users = require("./users");
const Chat = require("./chat");

module.exports = app => {
  const modules = {};
  modules.utils = utils;
  modules.users = new Users(app, modules);
  modules.chat = new Chat(app, modules);
  return modules;
};
