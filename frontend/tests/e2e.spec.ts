import { test, expect } from '@playwright/test';

test.describe('Has the correct UI elements', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Roman Numeral Converter/);
  });

  test('has a heading', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Roman Numeral Converter' })).toBeVisible();
  });

  test('has a place to enter a number and a button', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('textbox', { name: 'Enter a number (1-3,999)' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Convert to roman numeral' })).toBeVisible();
  });
});

test.describe('Handles inputs correctly', () => {
  test('does not allow numbers outside range', async ({ page }) => {
    await page.goto('/');
    await page.fill('input', '4000');
    await page.getByRole('textbox', { name: 'Enter a number (1-3,999)' }).blur();

    await expect(page.getByRole('textbox', { name: 'Enter a number (1-3,999)' })).toHaveValue('3,999');

    await page.fill('input', '0');
    await page.getByRole('textbox', { name: 'Enter a number (1-3,999)' }).blur();

    await expect(page.getByRole('textbox', { name: 'Enter a number (1-3,999)' })).toHaveValue('1');
  });

  test('can convert a number to roman numeral correctly', async ({ page }) => {
    await page.goto('/');

    await page.fill('input', '42');
    await page.click('button');

    await expect(page.getByText('Roman numeral:')).toContainText('XLII');
  });

  test('shows error when nothing is input', async ({ page }) => {
    await page.goto('/');
    await page.click('button');

    await expect(page.getByText('Something went wrong:')).toContainText('Parameter must be between 1 and 3999');
    await expect(page.getByText('Roman numeral:')).not.toBeVisible();
  });

  test('hides error when input is corrected', async ({ page }) => {
    await page.goto('/');
    await page.click('button');

    await expect(page.getByText('Something went wrong:')).toContainText('Parameter must be between 1 and 3999');
    await expect(page.getByText('Roman numeral:')).not.toBeVisible();

    await page.fill('input', '42');
    await page.click('button');

    await expect(page.getByText('Something went wrong:')).not.toBeVisible();
    await expect(page.getByText('Roman numeral:')).toContainText('XLII');
  });

  test('hides roman numeral when input is emptied', async ({ page }) => {
    await page.goto('/');
    await page.fill('input', '42');
    await page.click('button');

    await expect(page.getByText('Something went wrong:')).not.toBeVisible();
    await expect(page.getByText('Roman numeral:')).toContainText('XLII');

    await page.fill('input', '');
    await page.click('button');

    await expect(page.getByText('Something went wrong:')).toBeVisible();
    await expect(page.getByText('Roman numeral:')).not.toBeVisible();
  })
});
