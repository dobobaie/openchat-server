const fs = require("fs");
const knex = require("knex");

const config = require("../app/config")(process.env);

const pg = knex({
  client: "pg",
  connection: {
    host: config.postgres_url,
    user: config.postgres_user,
    password: config.postgres_password,
    database: config.postgres_db
  }
});

(async () => {
  const initSql = fs.readFileSync(`${__dirname}/init.sql`).toString();
  // eslint-disable-next-line
  await pg.raw(initSql).catch(err => console.log(err));
  pg.destroy();
})();
