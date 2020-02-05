module.exports = () => async (ctx, next) => {
  ctx.public_ip = ctx.headers["x-forwarded-for"];
  await next();
};
