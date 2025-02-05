import { test, expect } from "@playwright/test";


const mainPageUrl = "https://ostrovok.ru/?lang=en"

test.beforeEach(async ({ page }) => {
    await page.goto(mainPageUrl);
});

test("elementsMainPage", async ({ page }) => {
    const title = page.locator('.homepage-block-title');
    const destinationInput = page.getByPlaceholder('City, hotel or airport');
    const checkinInput = page.getByTestId('date-start-input');
    const checkoutInput = page.getByTestId('date-end-input');
    const guests = page.getByTestId('guests-input'); // значение
    const searchButton = page.getByTestId('search-button');

    await destinationInput.fill('Prague');

    await expect(title).toBeVisible()
    await expect(checkinInput).toHaveText('Feb 8, 2025');
    await expect(checkoutInput).toHaveText('Feb 9, 2025');
    await expect(guests).toHaveText('2 guests');
});

test("elementsHeader", async ({ page }) => {
    const logo = page.getByTestId('header-logo-link');
    const language = page.getByTestId('language-widget-control');
    const languageItem = page.getByTestId('language-widget-item').first();
    const currency = page.locator('//*[contains (@class, "CurrencyWidget-module__control--")]');
    const askSupport = page.locator('//*[contains (@class, "SupportWidget-module__control--")]');
    const feedbackButton = page.getByText('Feedback form');
    const loginButton = page.locator('//*[contains (@class, "Control-module__control--")]');
    const loginInput = page.getByTestId('user-widget-sign-in-email-input');
    const burgerButton = page.getByTestId('menu-widget-control');
    const burgerMenu = page.locator('//*[contains (@class, "MenuWidget-module__content--")]');

    await expect(logo).toBeEnabled();
    await expect(currency).toBeEnabled();

    await language.click();
    await expect(languageItem).toBeVisible();

    await askSupport.click();
    await expect(feedbackButton).toBeVisible();
    await expect(feedbackButton).toBeEnabled();

    await loginButton.click();
    await expect(loginInput).toBeVisible();
    await expect(loginInput).toBeEnabled();

    await burgerButton.click();
    await expect(burgerMenu).toBeVisible();
    await expect(burgerMenu).toBeEnabled();
});