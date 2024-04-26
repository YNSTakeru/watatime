const axios = require("axios");
const qs = require("qs");
const { setCookie } = require("../helpers/cookieHelper");

const WAKATIME_TOKEN_URL = "https://wakatime.com/oauth/token";
const ACCESS_TOKEN_EXPIRY_TIME = 900 * 1000;
const REFRESH_TOKEN_EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000;

function getTokensFromResponse(data) {
  const params = new URLSearchParams(data);
  return {
    accessToken: params.get("access_token"),
    refreshToken: params.get("refresh_token"),
  };
}

async function requestTokens(code, redirectUri, clientId, clientSecret) {
  const postData = qs.stringify({
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const config = {
    headers: {
      Accept: "application/x-www-form-urlencoded",
    },
  };

  return await axios.post(WAKATIME_TOKEN_URL, postData, config);
}

module.exports = async function (req, res) {
  const code = req.body.code;

  if (!code) {
    res.status(400).json({ status: "error", message: "Code is required." });
    return;
  }

  try {
    const tokenResponse = await requestTokens(
      code,
      process.env.REDIRECT_URI,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
    const { accessToken, refreshToken } = getTokensFromResponse(
      tokenResponse.data
    );

    setCookie(res, "access_token", accessToken, ACCESS_TOKEN_EXPIRY_TIME);
    setCookie(res, "refresh_token", refreshToken, REFRESH_TOKEN_EXPIRY_TIME);

    res.json({ status: "success", message: "Token are set." });
  } catch (error) {
    console.error("Error in /auth: ", error);
    throw error;
  }
};
