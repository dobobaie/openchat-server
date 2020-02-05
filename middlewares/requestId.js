const Chance = require("chance");

module.exports = () => async (ctx, next) => {
  const c = new Chance();
  ctx.set("X-Request-Id", c.guid());
  await next();
};
