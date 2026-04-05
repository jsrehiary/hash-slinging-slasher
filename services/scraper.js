const puppeteer = require("puppeteer");
const BASE_URL = process.env.BASE_URL;

async function scrapeRooms() {

  const url = `${BASE_URL}/resv/indexCari/1`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector(".room-card");

    const rooms = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".room-card")).map(card => {
        const name = card.querySelector(".card-title")?.innerText.trim();

        const texts = card.querySelectorAll(".card-text");
        const kapasitas = texts[0]?.innerText.replace("Kapasitas:", "").trim();
        const gedung = texts[1]?.innerText.replace("Gedung:", "").trim();

        const image = card.querySelector("img")?.src;
        const link = card.querySelector("a")?.href;

        const idMatch = link.match(/resvdetail\/(\d+)/);
        const id = idMatch ? idMatch[1] : null;

        return { id, name, kapasitas, gedung, image, link };
      });
    });

    return rooms;

  } catch (err) {
    console.error(err);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeRooms };