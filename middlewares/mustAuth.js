module.exports = () => async (ctx, next) => {
  if (!ctx.authParams) {
    throw new Error("invalid_authorization_token");
  }
  await next();
};
