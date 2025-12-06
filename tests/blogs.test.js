const page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});
