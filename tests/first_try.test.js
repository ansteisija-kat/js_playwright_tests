import { test, expect } from "@playwright/test";


const mainPageUrl = "https://ostrovok.ru/?lang=en"

test.beforeEach(async ({ page }) => {
    await page.goto(mainPageUrl);
});

test("elements on main page", async ({ page }) => {
    const title = page.locator('.homepage-block-title');
    const destinationInput = page.getByPlaceholder('City, hotel or airport');
    const checkinInput = page.getByTestId('date-start-input');
    const checkoutInput = page.getByTestId('date-end-input');
    const guests = page.getByTestId('guests-input'); // значение

    await destinationInput.fill('Prague');

    await expect(title).toBeVisible()
    await expect(checkinInput).toHaveText('Feb 8, 2025');
    await expect(checkoutInput).toHaveText('Feb 9, 2025');
    await expect(guests).toHaveText('2 guests');
});

test("elements in header", async ({ page }) => {
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

test("from main page to search page with chosen city", async ({ page }) => {
    const destinationInput = page.getByPlaceholder('City, hotel or airport');
    const destinationSelectList = page.locator('//*[contains (@class, "Popup-module__popup--")]').last();
    const destinationListItem = page.locator('//*[contains (@class, "Suggest-module__region_active--")]');
    const searchButton = page.getByTestId('search-button');

    // контроль маленькими шагами, потому что автоселект по введенной строке не всегда срабатывает
    await destinationInput.pressSequentially('Prague ');
    await expect(destinationSelectList).toBeVisible();
    await expect(destinationListItem).toHaveText('Prague, Czech Republic');
    await destinationListItem.click();

    await searchButton.click();

    await expect(page.url()).toContain('https://ostrovok.ru/hotel/czech_republic/prague/');
});

test("business option added to search page", async ({ page }) => {
    const searchButton = page.getByTestId('search-button');
    const businessOption = page.getByText('Business', { exact: true });

    await businessOption.click();
    await searchButton.dblclick();
    // тк не заполняется destination, по первому клику вставляется дефолтное значение Moscow

    await expect(page.url()).toContain('trip_type=business_trip');
});

