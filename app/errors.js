module.exports = {
  request_timeout: "clientTimeout",
  invalid_authorization: "unauthorized",
  invalid_token: "unauthorized",
  missing_authorization_token: "unauthorized",
  invalid_authorization_token: "unauthorized",

  validation_error_nickname_is_required: "badData",
  validation_error_password_is_required: "badData",
  validation_error_email_is_required: "badData",

  validation_error_nickname_is_not_allowed_to_be_empty: "badData",
  validation_error_password_is_not_allowed_to_be_empty: "badData",
  validation_error_email_is_not_allowed_to_be_empty: "badData",
  validation_error_email_must_be_a_valid_email: "badData",

  user_email_already_exists: "badData",
  user_does_not_exist: "badData"
};
