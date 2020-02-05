const mustUserIdOrAdmin = () => async (ctx, next) => {
  if (
    ctx.authParams.userIdOrAdmin &&
    ctx.authParams.userIdOrAdmin !== ctx.params.user_id
  ) {
    throw new Error("invalid_authorization_token");
  }
  await next();
};

module.exports = ({ users }) => router =>
  router
    .post(
      "/create",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(await users.createUser(ctx)(ctx.request.body))
    )
    .post(
      "/login",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(await users.loginUser(ctx)(ctx.request.body))
    )
    .get(
      "/:user_id",
      mustUserIdOrAdmin(),
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(await users.retrieveUser(ctx)(ctx.params.user_id))
    );
