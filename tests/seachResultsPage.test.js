import { test, expect } from '@playwright/test';
import { SERP } from "../page_object/seachResultsPage.js";


const pageUrl = 'https://ostrovok.ru/hotel/russia/moscow/?q=2395&dates=25.02.2025-26.02.2025&guests=2&trip_type=business_trip&price=one&sid=1ee79317-7c74-4c6d-8822-4b3261bcd5e4'

test.beforeEach(async ({ page }) => {
    const SearchPage = new SERP(page);
    await SearchPage.goto(pageUrl);

    await expect(SearchPage.header).toBeVisible({ timeout: 5_000 });
})

test("get dates from destination block", async ({ page }) => {
    const SearchPage = new SERP(page);

    // console.log('destinationBlockDatesText :', SearchPage.destinationBlockDatesText);
    // console.log('destinationBlockDates :', SearchPage.destinationBlockDates);
    await expect(SearchPage.destinationBlockDates).toHaveText('25 Feb 2025 — 26 Feb 2025');
});

test("get a city in a title and destination block", async ({ page }) => {
    const SearchPage = new SERP(page);

    await expect(SearchPage.destinationBlock).toBeVisible({ timeout: 5_000 });
    await expect(SearchPage.destinationBlockCity).toHaveText('Moscow, Russia');
    await expect(SearchPage.header).toContainText('Moscow'); // 2 заголовка – о поиске, пока загрузка, и результатах
});

test("empty results list if favourites active", async ({ page }) => {
    const SearchPage = new SERP(page);

    // const titleBefore = await SearchPage.title.innerText()
    await SearchPage.fav.click();
    // const titleAfter = await SearchPage.title.innerText()
    await expect(SearchPage.emptyResults).toBeVisible();
    await expect(SearchPage.emptyResultsFilters).toBeVisible();
    await expect(SearchPage.emptyResultsFilterRemoveButton).toBeEnabled();
});

test("click on tab remove filters and get new results list", async ({ page }) => {
    const SearchPage = new SERP(page);

    await SearchPage.fav.click();
    await expect(SearchPage.emptyResults).toBeVisible();

    await SearchPage.tabHotels.click();
    await expect(SearchPage.emptyResults).not.toBeVisible();
    await expect(SearchPage.header).toContainText('Moscow');
    await expect(SearchPage.tabHotels).toHaveClass(SearchPage.activeTab);
});

test("important elements are exist on result card", async ({ page }) => {
    const SearchPage = new SERP(page);

    await expect(SearchPage.hotelsList).toBeVisible();
    await expect(SearchPage.hotelCard).toBeVisible();
    await expect(SearchPage.hotelCardImage).toBeEnabled();
    await expect(SearchPage.hotelCardName).toBeEnabled();
    await expect(SearchPage.hotelCardAddress).toBeEnabled();
    await expect(SearchPage.hotelCardFavButton).toBeEnabled();
    await expect(SearchPage.hotelCardRate).toBeEnabled();
    await expect(SearchPage.hotelCardAmenitiesIcon).toBeVisible();
    await expect(SearchPage.hotelCardValueAddsList).toBeVisible();
    // TODO пока только на примере 1ой карточки, потом лучше сделать проверку для всех
});

test("check filter – free cancellation", async ({ page }) => {
    const SearchPage = new SERP(page);

    // const valueAddsList_before = await SearchPage.hotelCardValueAddsList.innerText(); // текст на карточке до
    await SearchPage.paymentTypesFreeCancel.click(); // выбираем в фильтрах одно значение

    await expect(SearchPage.hotelCard).toBeVisible();
    await expect(SearchPage.hotelCardName).toBeEnabled(); // чтобы точно убедиться, что карточка прогрузилась
    // const valueAddsList_after = await SearchPage.hotelCardValueAddsList.innerText(); // текст на карточке после

    await expect(SearchPage.hotelCardValueAddsList).toContainText('Free cancellation');
    // TODO пока только на примере 1ой карточки, потом лучше сделать проверку для всех
});

test("check filter – hotel name – valid", async ({ page }) => {
    const SearchPage = new SERP(page);

    const validHotelNameStr = 'Abc '
    await expect(SearchPage.hotelNameFilter).toBeVisible({ timeout: 10_000 });
    await SearchPage.hotelNameFilter.fill(validHotelNameStr); // валидный вариант

    await expect(SearchPage.titleWithFilters).toHaveText('with the applied filters:');
    // await expect(SearchPage.newResultsUp).toBeVisible();
    // await SearchPage.newResultsUpButton.click();

    await expect(SearchPage.hotelCard).toBeVisible({ timeout: 30_000 }); // работает куда стабильнее только с таким таймингом :(
    await expect(SearchPage.hotelCardName).toBeEnabled();

    await expect(SearchPage.hotelCardName).toContainText(validHotelNameStr);
    await expect(SearchPage.filterUnderTitle).toHaveText(validHotelNameStr);

    // after
    await SearchPage.filterUnderTitleRemoveButton.click();
});

test("check filter – hotel name – invalid, empty results", async ({ page }) => {
    const SearchPage = new SERP(page);

    const invalidHotelNameStr = ';0_'
    await expect(SearchPage.hotelNameFilter).toBeVisible();
    await SearchPage.hotelNameFilter.fill(invalidHotelNameStr); // валидный вариант

    await expect(SearchPage.hotelCard).toBeVisible();
    await expect(SearchPage.hotelCardName).toBeEnabled();

    await expect(SearchPage.emptyResults).toBeVisible();
    await expect(SearchPage.emptyResultsFilters).toBeVisible();
    await expect(SearchPage.emptyResultsFilterRemoveButton).toBeEnabled();
    await expect(SearchPage.emptyResultsFilterHotelNameStr).toHaveText(invalidHotelNameStr);

    // after
    await SearchPage.emptyResultsFilterRemoveButton.click();
});

test("check filter – full hotel name – valid", async ({ page }) => {
    const SearchPage = new SERP(page);

    const validFullHotelNameStr = 'Abc Apartments Apart Hotel'
    await expect(SearchPage.hotelNameFilter).toBeVisible();
    await SearchPage.hotelNameFilter.fill(validFullHotelNameStr); // валидный вариант

    await expect(SearchPage.titleWithFilters).toHaveText('with the applied filters:');

    await expect(SearchPage.hotelCard).toBeVisible({ timeout: 10_000 }); // работает куда стабильнее только с таким таймингом :(
    await expect(SearchPage.hotelCardName).toBeEnabled();

    await expect(SearchPage.hotelCardName).toContainText(validFullHotelNameStr);
    await expect(SearchPage.filterUnderTitle).toHaveText(validFullHotelNameStr);

    // after
    await SearchPage.filterUnderTitleRemoveButton.click();
    // TODO потом добавить сюда проверку, что карточка только 1
});
