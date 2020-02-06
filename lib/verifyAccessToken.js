const fs = require("fs");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync(`${__dirname}/../pem/public.key`);

module.exports = ({ orm }) => async ({ authorization }, next) => {
  if (!authorization) {
    throw new Error("access_token_is_missing");
  }

  // eslint-disable-next-line
  const access_token =
    authorization.toLowerCase().indexOf("bearer ") !== -1
      ? authorization.split(" ").pop()
      : authorization;

  await new Promise((resolve, reject) =>
    jwt.verify(access_token, publicKey, err =>
      err ? reject(err) : resolve()
    )
  );

  const authParams = jwt.decode(access_token, { complete: true });
  const { payload } = authParams;
  if (!payload.user_id) {
    throw new Error("access_token_user_id_is_missing");
  }

  const user = await orm.users.retrieveUserById(payload.user_id);
  if (!user) {
    throw new Error("access_token_user_is_missing");
  }

  next();    
};
