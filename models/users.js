const Joi = require("@hapi/joi");

const defaultRefs = require("./refs/default");

const fields = {
  id: Joi.string().description("Id of the user"),
  account_id: Joi.string().description("Id of the account of the user"),
  user_id: Joi.string().description("Id of the the user"),
  nickname: Joi.string().description("Nickname of the user"),
  email: Joi.string().description("Email address of the user"),
  password: Joi.string().description("Password of the user"),
  is_verified: Joi.boolean().description("Account is verified true/false"),
  is_admin: Joi.boolean().description("Account is admin true/false"),
  access_token: Joi.string().description("Access token")
};

const refs = {
  light_infos_user: Joi.object({
    id: fields.id,
    account_id: fields.account_id,
    user_id: fields.user_id,
    email: fields.email,
    nickname: fields.nickname,
    is_verified: fields.is_verified,
    is_admin: fields.is_admin
  }).label("light_infos_user"),
  infos_user_is_required: Joi.object({
    nickname: fields.nickname.required(),
    email: fields.email.email().required(),
    password: fields.password.required()
  })
    .required()
    .label("infos_user_is_required")
};

const models = () => ({
  "POST/users/create": {
    body: refs.infos_user_is_required,
    response: defaultRefs.status.description(
      "Create a new user with a simple right"
    )
  },
  "POST/users/login": {
    body: Joi.object({
      email: fields.email.email().required(),
      password: fields.password.required()
    }),
    response: Joi.object({
      access_token: fields.access_token.required()
    })
      .required()
      .description("Process to a log in request")
  },
  "GET/users/:user_id": {
    queries: defaultRefs.token,
    response: Joi.object({
      user: refs.light_infos_user.default(null)
    })
      .required()
      .description("Retrieve an user")
  }
});

module.exports = models;
