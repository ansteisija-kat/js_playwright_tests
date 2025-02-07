import { test, expect } from '@playwright/test';
import { OstrovokMainPage } from "../page_object/page.js";


test("elements on main page", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()

    await MainPage.destinationInput.fill('Prague');

    await expect(MainPage.title).toBeVisible()
    await expect(MainPage.checkinInput).toHaveText('Feb 8, 2025');
    await expect(MainPage.checkoutInput).toHaveText('Feb 9, 2025');
    await expect(MainPage.guests).toHaveText('2 guests');
});

test("elements in header", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()

    await expect(MainPage.logo).toBeEnabled();
    await expect(MainPage.currency).toBeEnabled();

    await MainPage.language.click();
    await expect(MainPage.languageItem).toBeVisible();

    await MainPage.headerSupportOpenPopupWithButton();

    await MainPage.loginButton.click();
    await expect(MainPage.loginInput).toBeVisible();
    await expect(MainPage.loginInput).toBeEnabled();

    await MainPage.headerBurgerOpenList();
});

test('bis option added to search page', async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()
    await MainPage.businessOption.click();
    await MainPage.toSearchPageWithDefaultDestination();

    await expect(page.url()).toContain('https://ostrovok.ru/hotel/');
    await expect(page.url()).toContain('trip_type=business_trip');
});
// TODO нестабильный, иногда падает (не переходит на страницу поиска)

test("from main to search page with chosen city", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()
    await MainPage.fillDestinationEu();
    await MainPage.searchButton.click();

    await expect(page.url()).toContain('https://ostrovok.ru/hotel/czech_republic/prague/');
});

