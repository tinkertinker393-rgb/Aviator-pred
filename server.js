const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const platformConfig = {
  betika: {
    url: "https://www.betika.com/en-gb/games/aviator",
    selectors: [
      '.aviator-current-multiplier',
      '.current-multiplier-value',
      '.aviator-bar .multiplier',
      '.multiplier'
    ]
  },
  odi: {
    url: "https://www.odibets.com/games/aviator",
    selectors: [
      '.aviator-current-multiplier',
      '.multiplier',
      '.current-multiplier-value'
    ]
  },
  shabiki: {
    url: "https://www.shabiki.com/games/aviator",
    selectors: [
      '.aviator-current-multiplier',
      '.multiplier',
      '.crash-value'
    ]
  },
  sportpesa: {
    url: "https://www.sportpesa.com/games/aviator",
    selectors: [
      '.aviator-current-multiplier',
      '.multiplier',
      '.multiplier-value'
    ]
  }
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/api/predict', async (req, res) => {
  const platform = req.body.platform;
  const config = platformConfig[platform];
  if (!config) return res.json({ success: false, error: "Unknown platform" });

  let browser, page;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 30000 });

    let value = null;
    for (const selector of config.selectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        value = await page.$eval(selector, el => el.textContent.trim());
        if (value) break;
      } catch (e) { /* Try next selector */ }
    }

    await browser.close();
    if (value) return res.json({ success: true, value });
    return res.json({ success: false, error: "No crash/multiplier value found with provided selectors" });
  } catch (err) {
    if (browser) await browser.close();
    return res.json({ success: false, error: "Scraping failed: " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Aviator predictor backend running at http://localhost:${PORT}`);
  });
}
module.exports = app;
