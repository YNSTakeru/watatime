const qs = require("qs");

const WAKATIME_AUTH_URL = "https://wakatime.com/oauth/authorize";
const SCOPE = "email,read_stats.languages,read_heartbeats";

module.exports = function (req, res) {
  const originalState = req.cookies.state;
  if (req.session.state !== originalState) {
    console.error(
      `Invalid state: expected ${req.session.state} but got ${originalState}`
    );
    res.status(400).send("Invalid state");
    return;
  }
  const clientId = req.cookies.client_id;
  const redirectURI = req.cookies.redirect_uri;
  if (!clientId || !redirectURI) {
    console.error("Missing required parameters: client_id or redirect_uri");
    res.status(400).send("Missing required parameters");
    return;
  }
  const params = {
    client_id: clientId,
    scope: SCOPE,
    response_type: "code",
    state: originalState,
    redirect_uri: redirectURI,
  };
  const url = `${WAKATIME_AUTH_URL}?${qs.stringify(params)}`;
  res.redirect(url);
};
