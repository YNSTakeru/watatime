const express = require("express");
const router = express.Router();
const auth = require("./controllers/index");

router.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
router.get("/", auth.displayHomePage);
router.get("/code", auth.getCode);
router.get("/get-code", auth.redirectToWakaTime);
router.get("/response-code", (req, res) => {
  res.sendFile(`${__dirname}/views/callback.html`);
});
router.post("/auth", auth.getTokens);
router.get("/commits", auth.getCommits);
router.get("/logout", auth.logout);

module.exports = router;
