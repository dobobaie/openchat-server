const shortid = require("shortid");

module.exports = function Accounts({ knexpg }) {
  this.createAccount = ({ email, password, salt_key }) =>
    knexpg("accounts")
      .insert({
        id: shortid.generate(),
        email,
        password,
        salt_key
      })
      .returning("*")
      .get(0);

  this.retrieveAccountByEmail = email =>
    knexpg("accounts")
      .where({
        email,
        deleted_at: null
      })
      .first();

  this.verifyIfAccountExistsByEmail = email =>
    knexpg("accounts")
      .where({
        email,
        deleted_at: null
      })
      .first();
};
