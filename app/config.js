module.exports = env => {
  const config = {
    env: env.NODE_ENV,
    server_ip: env.SERVER_IP,
    server_port: env.SERVER_PORT,
    locale: env.LOCALE,
    access_token: env.ACCESS_TOKEN,
    rest_api_timeout: Number.parseInt(env.REST_API_TIMEOUT, 10) || 10000,
    postgres_url: env.POSTGRES_URL,
    postgres_db: env.POSTGRES_DB,
    postgres_user: env.POSTGRES_USER,
    postgres_password: env.POSTGRES_PASSWORD,

    available_locales: ["fr", "en"],
    corp: {
      name: "Bamboo",
      email: "contact@bamboo.com",
      url: "https://bamboo.com"
    },
    jwt: {
      expiresIn: "365d",
      algorithm: "RS256"
    }
  };

  if (
    !(
      config.server_ip &&
      config.server_port &&
      config.locale &&
      config.available_locales.indexOf(config.locale) !== -1 &&
      config.access_token &&
      config.postgres_url &&
      config.postgres_db &&
      config.postgres_user &&
      config.postgres_password
    )
  ) {
    throw new Error("wrong_or_missing_configuration");
  }
  return config;
};
