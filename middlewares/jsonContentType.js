module.exports = () => async (ctx, next) => {
  ctx.set("Content-Type", "application/json");
  await next();
};
