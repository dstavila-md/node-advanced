const puppeteer = require('puppeteer');

test('adds two numbers', () => {
  const sum = 1 + 2;
  expect(sum).toBe(3);
});

test('We can launch a browser', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);
  expect(text).toBe('Blogster');

  await browser.close();
});
