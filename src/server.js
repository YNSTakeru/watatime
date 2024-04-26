const express = require("express");
const https = require("https");
const httpsOptions = require("./helpers/httpsOptions");
const applyMiddlewares = require("./middlewares");
const routes = require("./routes");

const PORT = 3000;

function createServer() {
  const app = express();

  applyMiddlewares(app);
  app.use(routes);

  return app;
}

function createHttpsServer(app) {
  return https.createServer(httpsOptions, app);
}

const getServerMessage = (port) =>
  `Server is running on https://localhost:${port}`;

function startServer(server, port) {
  server.listen(port, () => {
    console.log(getServerMessage(port));
  });
}

function run(port) {
  const app = createServer();
  const server = createHttpsServer(app);
  startServer(server, port);
}

run(PORT);
