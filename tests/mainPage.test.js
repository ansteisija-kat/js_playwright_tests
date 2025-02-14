import { test, expect } from '@playwright/test';
import { OstrovokMainPage } from "../page_object/mainPage.js";
import { SERP } from "../page_object/seachResultsPage.js";
import { Header } from "../page_object/header.js";


test.beforeEach(async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()
})

test("elements on main page", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);

    await MainPage.destinationInput.fill('Prague');

    await expect(MainPage.title).toBeVisible()
    await expect(MainPage.checkinInput).toHaveText('Feb 15, 2025');
    await expect(MainPage.checkoutInput).toHaveText('Feb 16, 2025');
    await expect(MainPage.guests).toHaveText('2 guests');
});

test("elements in header", async ({ page }) => {
    const HeaderElems = new Header(page);

    await expect(HeaderElems.logo).toBeEnabled();
    await expect(HeaderElems.currencyMainPage).toBeEnabled();

    await HeaderElems.language.click();
    await expect(HeaderElems.languageItem).toBeVisible();

    await HeaderElems.headerSupportOpenPopupWithButton();

    await HeaderElems.loginButton.click();
    await expect(HeaderElems.loginInput).toBeVisible();
    await expect(HeaderElems.loginInput).toBeEnabled();

    await HeaderElems.headerBurgerOpenList();
    // TODO переселить в отдельный файл для тестов хэдера
});

test('bis option added to search page', async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    const SearchPage = new SERP(page);

    await MainPage.businessOption.click();
    await MainPage.toSearchPageWithDefaultDestination();

    await expect(page.url()).toContain('https://ostrovok.ru/hotel/');
    await expect(page.url()).toContain('trip_type=business_trip');
    await expect(SearchPage.header).toBeVisible();
});
// TODO нестабильный, иногда падает (не переходит на страницу поиска)

test("from main to search page with chosen city", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    const SearchPage = new SERP(page);

    await MainPage.fillDestinationEu();
    await MainPage.searchButton.click();

    await expect(page.url()).toContain('https://ostrovok.ru/hotel/czech_republic/prague/');
    await expect(SearchPage.header).toBeVisible();
    await expect(SearchPage.destinationBlock).toBeVisible();
});

