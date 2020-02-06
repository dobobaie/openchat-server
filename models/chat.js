const Joi = require("@hapi/joi");

const defaultRefs = require("./refs/default");

const fields = {
  id: Joi.string().description("Id of the user"),
  user_id: Joi.string().description("Id of the the user"),
  message: Joi.string().description("Message to set in the chat")
};

const refs = {
  chat_message_is_required: Joi.object({
    message: fields.message.required()
  })
    .required()
    .label("chat_message_is_required")
};

const models = () => ({
  "POST/chat/message": {
    queries: defaultRefs.token,
    body: refs.chat_message_is_required,
    response: defaultRefs.status.description("Create a new message in the chat")
  }
});

module.exports = models;
