const puppeteer = require("puppeteer");
const { emails, LINK, getProxy } = require("./utils");

async function startBrowserWithAdspower() {
  const ws = await getProxy();
  const browser = await puppeteer.connect({ browserWSEndpoint: ws });

  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 900 });

  await page.goto(LINK, {
    waitUntil: "networkidle2",
    timeout: 300000,
  });

  for (const email of emails) {
    await page.waitForSelector("#Profile");
    await page.select("#Profile", "Retail");
    await page.type("#Testnet-Waitlist-Newsletter", email);
    await page.click("#w-node-bbaeeff9-d321-d237-eada-1d92d781d818-d781d80c");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.reload();
  }
}

startBrowserWithAdspower();
