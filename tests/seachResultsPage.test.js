import { test, expect } from '@playwright/test';
import { SERP } from "../page_object/seachResultsPage.js";


// const activeTab = /Tabs__tab_active--/

// test("main elements on page", async ({ page }) => {
//     const SearchPage = new SERP(page);
//     await SearchPage.goto()
//
//     await SearchPage.destinationInput.fill('Prague');
//
//     await expect(SearchPage.title).toBeVisible()
//     await expect(SearchPage.checkinInput).toHaveText('Feb 8, 2025');
//     await expect(SearchPage.checkoutInput).toHaveText('Feb 9, 2025');
//     await expect(SearchPage.guests).toHaveText('2 guests');
// });

test("get dates from destination block", async ({ page }) => {
    const SearchPage = new SERP(page);
    await SearchPage.goto('https://ostrovok.ru/hotel/russia/moscow/?q=2395&dates=15.02.2025-16.02.2025&guests=2&trip_type=business_trip&price=one&sid=1ee79317-7c74-4c6d-8822-4b3261bcd5e4')

    await expect(SearchPage.title).toBeVisible();
    // console.log('destinationBlockDatesText :', SearchPage.destinationBlockDatesText);
    // console.log('destinationBlockDates :', SearchPage.destinationBlockDates);
    await expect(SearchPage.destinationBlockDates).toHaveText('15 Feb 2025 — 16 Feb 2025');
});

test("get a city in a title and destination block", async ({ page }) => {
    const SearchPage = new SERP(page);
    await SearchPage.goto('https://ostrovok.ru/hotel/russia/moscow/?q=2395&dates=15.02.2025-16.02.2025&guests=2&trip_type=business_trip&price=one&sid=1ee79317-7c74-4c6d-8822-4b3261bcd5e4')

    await expect(SearchPage.destinationBlockCity).toHaveText('Moscow, Russia');
    await expect(SearchPage.title).toContainText('Moscow'); // 2 заголовка – о поиске, пока загрузка, и результатах
});

test("empty results list if favourites active", async ({ page }) => {
    const SearchPage = new SERP(page);
    await SearchPage.goto('https://ostrovok.ru/hotel/russia/moscow/?q=2395&dates=15.02.2025-16.02.2025&guests=2&trip_type=business_trip&price=one&sid=1ee79317-7c74-4c6d-8822-4b3261bcd5e4')

    // let titleBefore = SearchPage.title.innerText()
    await SearchPage.fav.click();
    // let titleAfter = SearchPage.title.innerText()
    // console.log('titleBefore: ', titleBefore);
    // console.log('titleAfter: ', titleAfter);
    await expect(SearchPage.emptyResults).toBeVisible();
    await expect(SearchPage.emptyResultsFilters).toBeVisible();
    await expect(SearchPage.emptyResultsFilterRemoveButton).toBeEnabled();
});

test("click on tab remove filters and get new results list", async ({ page }) => {
    const SearchPage = new SERP(page);
    await SearchPage.goto('https://ostrovok.ru/hotel/russia/moscow/?q=2395&dates=15.02.2025-16.02.2025&guests=2&trip_type=business_trip&price=one&sid=1ee79317-7c74-4c6d-8822-4b3261bcd5e4')

    await SearchPage.fav.click();
    await expect(SearchPage.emptyResults).toBeVisible();

    await SearchPage.tabHotels.click();
    await expect(SearchPage.emptyResults).not.toBeVisible();
    await expect(SearchPage.title).toContainText('Moscow');
    await expect(SearchPage.tabHotels).toHaveClass(SearchPage.activeTab);
});



