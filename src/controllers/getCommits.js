const axios = require("axios");

module.exports = async function (req, res) {
  const project = process.env.REPO;
  const accessToken = req.cookies.access_token;

  console.log(project);

  axios
    .get(
      `https://wakatime.com/api/v1/users/current/projects/${project}/commits`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
};
