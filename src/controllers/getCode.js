const crypto = require("crypto");
const path = require("path");
const { setCookie } = require("../helpers/cookieHelper");

const COOKIE_EXPIRY_TIME_MS = 900 * 1000;
const RANDOM_BYTES_LENGTH = 20;

function setCookies(res, data, COOKIE_EXPIRY_TIME_MS) {
  Object.keys(data).forEach((key) => {
    setCookie(res, key, data[key], COOKIE_EXPIRY_TIME_MS);
  });
}

function getEnvVars(vars) {
  return vars.reduce((obj, v) => {
    obj[v] = process.env[v];
    return obj;
  }, {});
}

function getCode(req, res) {
  const { CLIENT_ID: clientId, REDIRECT_URI: redirectURI } = getEnvVars([
    "CLIENT_ID",
    "REDIRECT_URI",
  ]);
  const state = crypto.randomBytes(RANDOM_BYTES_LENGTH).toString("hex");

  req.session.state = state;

  setCookies(
    res,
    {
      client_id: clientId,
      redirect_uri: redirectURI,
      state: state,
    },
    COOKIE_EXPIRY_TIME_MS
  );

  res.sendFile(path.join(__dirname, "/../views/code.html"));
}

module.exports = getCode;
