module.exports = ({ chat }) => router =>
  router.post(
    "/message",
    async (ctx, next) =>
      // eslint-disable-next-line
        await next(await chat.newMessage(ctx)(ctx.request.body))
  );
