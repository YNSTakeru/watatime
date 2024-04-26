// displayHomePage.js
const axios = require("axios");
const path = require("path");

const INDEX_PAGE = "../views/index.html";
const HOME_PAGE = "../views/home.html";
const WAKATIME_API_URL = "https://wakatime.com/api/v1/users/current";

function sendFile(res, filename) {
  res.sendFile(path.join(__dirname, filename), function (err) {
    if (err) {
      console.error(`Error sending file ${filename}: ${err.message}`);
      res.status(500).send(`Error sending file ${filename}`);
    }
  });
}

async function displayHomePage(req, res) {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    sendFile(res, INDEX_PAGE);
    return;
  }

  try {
    await axios.get(WAKATIME_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    sendFile(res, HOME_PAGE);
  } catch (error) {
    console.error(`Error fetching data from Wakatime API: ${error.message}`);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    sendFile(res, INDEX_PAGE);
  }
}

module.exports = displayHomePage;
