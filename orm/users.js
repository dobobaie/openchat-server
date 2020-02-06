const shortid = require("shortid");

module.exports = function Users({ knexpg }) {
  this.createUser = ({ nickname, account_id }) =>
    knexpg("users")
      .insert({
        id: shortid.generate(),
        nickname,
        account_id
      })
      .returning("*")
      .get(0);

  this.retrieveUserById = user_id =>
    knexpg("users")
      .where({
        id: user_id,
        deleted_at: null
      })
      .first();

  this.retrieveUserByAccountId = account_id =>
    knexpg("users")
      .where({
        account_id,
        deleted_at: null
      })
      .first();

  this.verifyIfUserExistsByNickname = nickname =>
    knexpg("users")
      .where({
        nickname,
        deleted_at: null
      })
      .first();
};
