const Accounts = require("./accounts");
const Users = require("./users");

module.exports = (...args) => ({
  accounts: new Accounts(...args),
  users: new Users(...args)
});
