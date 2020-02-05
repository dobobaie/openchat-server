const Default = require("./default");

module.exports = (...args) => Object.assign({}, Default(...args));
