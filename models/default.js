const Joi = require("@hapi/joi");

const models = ({ packageJSON }) => ({
  "GET/": {
    response: Joi.object({
      message: Joi.string().default(
        `Welcome to ${packageJSON.name} ${packageJSON.version}`
      )
    }).description("Introduce the service")
  },
  "GET/health": {
    tags: ["default"],
    response: Joi.object({
      status: Joi.string().default("OK")
    }).description("Verify if the service is working")
  }
});

module.exports = models;
