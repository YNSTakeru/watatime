const axios = require("axios");

async function revokeToken(accessToken, clientId, clientSecret) {
  try {
    const response = await axios.post(
      "https://wakatime.com/oauth/revoke",
      {
        client_id: clientId,
        client_secret: clientSecret,
        token: accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Token successfully revoked");
    } else {
      console.log("Failed to revoke token");
    }
  } catch (error) {
    console.error("Error revoking token: ", error);
  }
}

module.exports = {
  revokeToken,
};
