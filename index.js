/* eslint-disable */
const Promise = require('bluebird');

let logger = type => event => console[type === "info" ? "log" : type](event);
const perror = (type, error) => {
  logger("error")(
    Object.assign(error, {
      event: type,
      message: error.message
    })
  );
  process.exit(1);
};
process.on("uncaughtException", error => perror("uncaughtException", error));
process.on("unhandledRejection", error => perror("unhandledRejection", error));

const packageJSON = require("./package.json");
const config = require("./app/config")(process.env);

/*** Knex ***/
const pg = require("pg");
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

const knex = require("knex");
const knexpg = knex({
  client: "pg",
  connection: {
    host: config.postgres_url,
    database: config.postgres_db,
    user: config.postgres_user,
    password: config.postgres_password
  }
});

/*** Orm ***/
const Orm = require('./orm');
const orm = Orm({ knexpg });

/*** Redis ***/
const Redis = require('redis');
Promise.promisifyAll(Redis.RedisClient.prototype);
Promise.promisifyAll(Redis.Multi.prototype);
const redis = Redis.createClient(config.redis_url);

/*** GerJs ***/
const modelsAPI = require("./models");
const gerJs = require("gerjs-fireflyio")({
  swagger: {
    servers_url: [ `http://${config.server_ip}:${config.server_port}/` ]
  },
})(modelsAPI({ packageJSON }));

/*** Lib ***/
const lib = {};
lib.verifyAccessToken = require('./lib/verifyAccessToken');

/*** App ***/
const app = {
  packageJSON,
  config,
  gerJs,
  orm,
  redis,
  socket: {},
  lib,
  logger
};

/*** Modules ***/
const modules = require("./modules")(app);
modules.server = require("./server")(app, modules);
modules.socket = require("./socket")(app, modules);

if (!module.parent) {
  modules.server.listen(config.server_port, () => {
    logger("info")({ event: `Server listening at ${config.server_port}` });
  });
}

module.exports = { app, modules };
