import { test, expect } from '@playwright/test';
import { OstrovokMainPage } from "../page_object/page.js";



test('bis option added to search page', async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()
    await MainPage.businessOption.click();
    await MainPage.toSearchPageWithDefaultDestination();

    await expect(page.url()).toContain('trip_type=business_trip');
});

test("from main to search page with chosen city", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()
    await MainPage.fillDestinationEu();

    await MainPage.searchButton.click();

    await expect(page.url()).toContain('https://ostrovok.ru/hotel/czech_republic/prague/');
});