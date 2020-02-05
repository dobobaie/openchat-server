const Fireflyio = require("fireflyio");
const FireflyioRouter = require("fireflyio-router");
const boom = require("boom");

const errors = require("./app/errors");

const jsonContentTypeMiddleware = require("./middlewares/jsonContentType");
const responseTimeMiddleware = require("./middlewares/responseTime");
const requestIdMiddleware = require("./middlewares/requestId");
const requestIpMiddleware = require("./middlewares/requestIp");
const errorsMiddleware = require("./middlewares/errors");
const loggerMiddleware = require("./middlewares/logger");
const parseAccessTokenMiddleware = require("./middlewares/parseAccessToken");
const mustAccessMiddleware = require("./middlewares/mustAccess");

const usersRoute = require("./routes/users");

module.exports = ({ config, gerJs, orm, logger }, modules) => {
  const app = new Fireflyio({ allowedHttpRequests: true });

  app.extend(FireflyioRouter);

  app.use(errorsMiddleware({ errors, logger }));
  app.use(parseAccessTokenMiddleware({ orm }));
  app.use(responseTimeMiddleware());
  app.use(requestIdMiddleware());
  app.use(requestIpMiddleware());
  app.use(loggerMiddleware({ logger }));
  app.use(jsonContentTypeMiddleware());
  app.use(gerJs.middleware(app.router));

  app.router
    .focus("/users", usersRoute(modules))
    .get("/swagger", mustAccessMiddleware(config.access_token), gerJs.expose())
    .get("/health")
    .get("/")
    .get("*", ctx => ctx.throw(boom.notFound()));

  return app;
};
