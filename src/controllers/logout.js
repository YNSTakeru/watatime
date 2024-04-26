const { revokeToken } = require("./revokeToken");

module.exports = async function (req, res) {
  await revokeToken(
    req.cookies.access_token,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );

  res.clearCookie("access_token");
  res.redirect("/");
};
