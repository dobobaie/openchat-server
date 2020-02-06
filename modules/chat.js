const MAX_MESSAGES = 24;

module.exports = function Chat({ orm, redis, socket, lib }) {
  this.newMessage = ({ authParams }) => async ({ message }) => {
    // I'm not proud....
    // the best way will be to setup rabbitmq and to manage creation and suppression in async way
    // TODO
    const user = await orm.users.retrieveUserById(authParams.user_id);
    const entry = {
      date: new Date(),
      from: user.nickname,
      message
    };

    socket.$st.diffuse(
      "OPENCHAT_NEW_MESSAGE",
      lib.verifyAccessToken({ orm }),
      entry
    );

    const messages = JSON.parse(
      (await redis.getAsync("OPENCHAT_MESSAGES")) || "[]"
    );
    messages.push(entry);

    const total_messages = messages.length;
    const allow_util_message = total_messages - MAX_MESSAGES;
    const messages_to_set = messages.slice(
      allow_util_message < 0 ? 0 : allow_util_message,
      total_messages
    );

    redis.setAsync("OPENCHAT_MESSAGES", JSON.stringify(messages_to_set));
  };
};
