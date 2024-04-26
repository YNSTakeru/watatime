const fs = require("fs");

const httpsOptions = {
  key: fs.readFileSync(__dirname + "/../../config/key.pem"),
  cert: fs.readFileSync(__dirname + "/../../config/cert.pem"),
};

module.exports = httpsOptions;
