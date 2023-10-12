import { test, expect } from '@playwright/test';

test('AviaSales Test', async ({ page }) => {
  await page.goto('https://www.aviasales.com/');
  await page.locator('[data-test-id="switch"] span').first().click();
  await page.locator('[data-test-id="origin-autocomplete-field"]').click();
  await page.locator('[data-test-id="origin-autocomplete-field"]').fill('new york');
  await page.locator('[data-test-id="suggest-airport-JFK"]').click();
  await page.locator('[data-test-id="destination-autocomplete-field"]').fill('Berlin');
  await page.getByLabel('Mon Oct 30 2023').getByText('30').click();
  await page.locator('[data-test-id="no-return-ticket"]').click();
  await page.locator('[data-test-id="passengers-field"]').click();
  await page.locator('[data-test-id="passengers-adults-field"] a').nth(1).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('[data-test-id="form-submit"]').click();
  const page1 = await page1Promise;       
  await expect(page1).toHaveURL(/search/);
  await expect(page1.locator('[data-test-id="origin-autocomplete-field"]')).toHaveValue('John F. Kennedy International Airport');
  await expect(page1.locator('input#destination')).toHaveValue('Berlin');
  await expect(page1.locator('[data-test-id="departure-date-input"]')).toHaveValue('Mon, October 30');
  await page1.locator('[data-test-id="passengers-field"]').click();
  await expect(page1.locator("//*[@data-test-id='passengers-adults-field']//span")).toHaveText('2');
  page1.close();
  page.close();
});