import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
    page.screenshot({ path: 'k6.png' });
  } finally {
    page.close();
  }
}
