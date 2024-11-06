const puppeteer = require("puppeteer");
const { emails, profiles, LINK, getProxy } = require("./utils");

function getRandomOption() {
  const options = ["Developer", "Operator", "Retail"];
  return options[Math.floor(Math.random() * options.length)];
}
async function startBrowserWithAdspower() {
  let countEmail = 1;
  let indexProfile = 0;

  let browser = null;
  let page = null;
  let ws = null;

  for (const email of emails) {
    if (countEmail === 1) {
      ws = await getProxy(profiles[indexProfile]);
      browser = await puppeteer.connect({ browserWSEndpoint: ws });

      page = await browser.newPage();
      await page.setViewport({ width: 1300, height: 900 });

      await page.goto(LINK, {
        waitUntil: "networkidle2",
        timeout: 300000,
      });

      await page.reload();
    }
    const randomOption = getRandomOption();
    await page.waitForSelector("#Profile");
    await page.select("#Profile", randomOption);
    await page.type("#Testnet-Waitlist-Newsletter", email);
    await page.click("#w-node-bbaeeff9-d321-d237-eada-1d92d781d818-d781d80c");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await page.reload();
    countEmail++;
    if (countEmail === 4) {
      await browser.close();
      indexProfile++;
      countEmail = 1;
    }
  }
}

if (emails.length === 0 || profiles.length === 0) {
  console.log(
    'error: No emails or profiles found. Please check the files "emails.txt" and "profiles.txt" are not empty. Exiting...  '
  );
  return;
}

if (emails.length / profiles.length > 10) {
  console.log(
    'error: Too many emails. Each profile can only have 10 email. Exiting...  '
  );
  return;
}

  startBrowserWithAdspower();
