module.exports = (app, { server }) => {
  const { redis, orm, lib } = app;
  const { socket } = server;

  // eslint-disable-next-line
  app.socket.$st = socket;

  socket.on("clientAuthenticated", async client => {
    const messages = JSON.parse(
      (await redis.getAsync("OPENCHAT_MESSAGES")) || "[]"
    );

    client.emit("OPENCHAT_MESSAGES", lib.verifyAccessToken({ orm }), {
      list: messages
    });
  });

  return socket;
};
