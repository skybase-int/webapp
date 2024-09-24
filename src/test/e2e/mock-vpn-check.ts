/**
 * Intercept VPN check and mock response
 * This file has to be imported in every e2e test file that you want it to run on.
 */
import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/ip/status?ip=*', route => {
    setTimeout(() => {
      route.fulfill({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        contentType: 'application/json',
        body: JSON.stringify({
          is_vpn: false,
          is_restricted_region: false
        })
      });
    }, 500);
  });
});
