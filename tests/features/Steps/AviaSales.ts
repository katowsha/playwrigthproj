import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import {chromium , Page, Browser, expect} from "@playwright/test";

let browser: Browser;
let page: Page;
let page1: Page;
let page1Promise: any;

setDefaultTimeout(60 * 1000);

Given('I navigate to avia sales url', async() => {
    browser = await chromium.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://www.aviasales.com/');
})


When('I look up for flights from new york to berlin por {int} adult passengers', async (int) =>{
    await page.locator('[data-test-id="switch"] span').first().click();
    await page.locator('[data-test-id="origin-autocomplete-field"]').click();
    await page.locator('[data-test-id="origin-autocomplete-field"]').fill('new york');
    await page.locator('[data-test-id="suggest-airport-JFK"]').click();
    await page.locator('[data-test-id="destination-autocomplete-field"]').fill('Berlin');
    await page.getByLabel('Mon Oct 30 2023').getByText('30').click();
    await page.locator('[data-test-id="no-return-ticket"]').click();
    await page.locator('[data-test-id="passengers-field"]').click();
    await page.locator('[data-test-id="passengers-adults-field"] a').nth(1).click();
})

When('I click on search buttons', async () => {
    page1Promise = page.waitForEvent('popup');
    await page.locator('[data-test-id="form-submit"]').click();
})

Then('I should see new tab open with', async()=> {
    page1 = await page1Promise;       
    await expect(page1).toHaveURL(/search/);
    await expect(page1.locator('[data-test-id="origin-autocomplete-field"]')).toHaveValue('John F. Kennedy International Airport');
    await expect(page1.locator('input#destination')).toHaveValue('Berlin');
    await expect(page1.locator('[data-test-id="departure-date-input"]')).toHaveValue('Mon, October 30');
    await page1.locator('[data-test-id="passengers-field"]').click();
    await expect(page1.locator("//*[@data-test-id='passengers-adults-field']//span")).toHaveText('2');
    await page1.close();
    await page.close();
})
  
