const fs = require("fs");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync(`${__dirname}/../pem/public.key`);

module.exports = ({ orm }) => async (ctx, next) => {
  const access_token = ctx.queries.access_token || ctx.headers.authorization;
  if (!access_token) {
    // eslint-disable-next-line
    return await next();
  }

  // eslint-disable-next-line
  const _access_token =
    access_token.toLowerCase().indexOf("bearer ") !== -1
      ? access_token.split(" ").pop()
      : access_token;

  try {
    await new Promise((resolve, reject) =>
      jwt.verify(_access_token, publicKey, err =>
        err ? reject(err) : resolve()
      )
    );

    const authParams = jwt.decode(_access_token, { complete: true });
    const { payload } = authParams;
    if (!payload.user_id) {
      throw new Error("access_token_user_id_is_missing");
    }

    const user = await orm.users.retrieveUserById(payload.user_id);
    if (!user) {
      throw new Error("access_token_user_is_missing");
    }

    ctx.authParams = payload;
    ctx.authParams.adminOrUserId = ctx.authParams.is_admin
      ? undefined
      : ctx.authParams.user_id;
  } catch (e) {
    //
  }

  // eslint-disable-next-line
  return await next();
};
