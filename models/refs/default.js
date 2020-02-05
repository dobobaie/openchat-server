const Joi = require("@hapi/joi");

module.exports = {
  token: Joi.object({
    token: Joi.string()
      .min(12)
      .max(30)
  }).label("token"),
  status: Joi.object({
    status: Joi.string().default("OK")
  }).label("status")
};
