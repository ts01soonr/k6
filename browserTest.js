    import { chromium } from 'k6/experimental/browser';
    import { check } from 'k6';
    import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";
   
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
            await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
            page.screenshot({ path: 'screenshots/browserTestScreenshot.png' });
   
           page.locator('#input-email').type('lambdatest.Cypress@disposable.com');
           page.locator('#input-password').type('Cypress123!!');
           const submitButton = page.locator('input[value="Login"]');
           await Promise.all([page.waitForNavigation(), submitButton.click()]);
   
           check(page, {
               'Verify user is logged In': () =>
                   page.locator('.breadcrumb-item.active').textContent() == 'Account',
           });
           check(page, {
               'Verify the text': () =>
                   page.locator('.breadcrumb-item.active').textContent() == 'Test',
           });
        } finally {
          page.close();
        }
      }    

    

    export function handleSummary(data) {
        return {
            '1Report.html': htmlReport(data, { debug: true })
        };

    }
