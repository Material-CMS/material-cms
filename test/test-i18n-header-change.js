#!/usr/bin/env node

/**
 * Simple test to change i18n-header field as a user and verify translation-map.
 * Uses the same reliable steps as debug-test.js.
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting i18n header change test...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: 'new',
    slowMo: 100,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(1500);
  const baseUrl = 'http://localhost:3000';
  // Use existing session cookie (from earlier login)
  const cookie = 'material-cms.sid=s%3AKZ0sgBW4mR4m2MV2e17suFy4ZhFEfteM.cIj8awQV2WjPbgclwMVCi51AUwK2%2Bd%2FRqh%2BMDDQP%2FwU';
  const [name, value] = cookie.split('=');
  await page.setCookie({ name, value, domain: 'localhost', path: '/' });
  const newText = 'Test header updated ' + Date.now();
  console.log('New text:', newText);

  // Step 1: Edit widget
  await page.goto(baseUrl + '/?edit=1', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-apos-widget-id="w586585298367900342"]');
  const editButton = await page.$('[data-apos-widget-id="w586585298367900342"] [data-apos-edit-item]');
  if (!editButton) throw new Error('Edit button not found');
  await editButton.click();
  await page.waitForSelector('.apos-modal', { visible: true });
  const enInput = await page.$('[data-locale="en"] input');
  if (!enInput) throw new Error('English input not found');
  await enInput.click({ clickCount: 3 });
  await enInput.press('Backspace');
  await enInput.type(newText);
  await page.evaluate(input => input.dispatchEvent(new Event('input', { bubbles: true })), enInput);
  const saveButton = await page.$('.apos-modal [data-apos-save]');
  await saveButton.click();
  await page.waitForSelector('.apos-modal', { hidden: true, timeout: 800 });
  console.log('Edit saved.');

  // Wait for widget data to update
  await page.waitForFunction(
    (widgetId, expectedText) => {
      const widget = document.querySelector(`[data-apos-widget-id="${widgetId}"]`);
      if (!widget) return false;
      const data = JSON.parse(widget.getAttribute('data'));
      return data.header.translations.en === expectedText;
    },
    { timeout: 1000 },
    'w586585298367900342',
    newText
  );
  console.log('Widget data updated.');

  // Wait for header text to reflect the change
  await page.waitForFunction(
    (expectedText) => {
      const header = document.querySelector('h2.section-header[data-translation-id]');
      return header && header.textContent.trim() === expectedText;
    },
    { timeout: 800 },
    newText
  );
  console.log('Header text updated.');

  // Step 2: Check translation-map on a fresh page
  const newPage = await browser.newPage();
  await newPage.setCookie({ name, value, domain: 'localhost', path: '/' });
  await newPage.goto(baseUrl + '/', { waitUntil: 'domcontentloaded' });
  const mapScript = await newPage.$('#translations-map');
  if (!mapScript) throw new Error('Translations map script not found');
  const mapText = await newPage.evaluate(script => script.textContent, mapScript);
  const map = JSON.parse(mapText);
  console.log('Translation map:', JSON.stringify(map, null, 2));
  const translation = map['translation-3'];
  if (!translation) throw new Error('Translation 3 not found in map');
  if (translation.en !== newText) {
    throw new Error(`Expected translation map en to be "${newText}" but got "${translation.en}"`);
  }
  console.log('✓ Translation map contains new text.');

  // Also verify header text matches
  const headerText = await newPage.$eval('h2.section-header[data-translation-id]', el => el.textContent.trim());
  if (headerText !== newText) {
    throw new Error(`Expected header text "${newText}" but got "${headerText}"`);
  }
  console.log('✓ Header text matches.');

  await newPage.close();
  await browser.close();
  console.log('Test passed successfully.');
  process.exit(0);
})().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});