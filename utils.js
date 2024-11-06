const axios = require("axios");
const fs = require("fs");

const profileId = "example"; // PROFILE ID from Adspower

const emails = fs
  .readFileSync("emails.txt", "utf8")
  .split("\n")
  .map((email) => email.trim())
  .filter((email) => email !== "");

const LINK = "https://aztec.network/waitlist";

async function getProxy() {
  const { data } = await axios.get(
    `http://local.adspower.com:50325/api/v1/browser/start`,
    {
      params: {
        user_id: profileId,
        token: "http://local.adspower.net:50325",
      },
    }
  );

  return data.data.ws.puppeteer;
}

module.exports = {
  emails,
  LINK,
  getProxy,
};
