import { test, expect } from '@playwright/test';
import { SERP } from "../../page_object/seachResultsPage.js";
import { OstrovokMainPage } from "../../page_object/mainPage.js";


test.beforeEach(async ({ page }) => {
    const SearchPage = new SERP(page);
    const MainPage = new OstrovokMainPage(page);
    await MainPage.goto()
    await MainPage.toSearchPageWithDefaultDestination();

    await expect(SearchPage.header).toBeVisible({ timeout: 20_000 }); // очень тяжко даже с такими таймаутами прогружается
    await expect(SearchPage.hotelsList).toBeVisible({ timeout: 10_000 });
});

test("get a city in a title and destination block", async ({ page }) => {
    const SearchPage = new SERP(page);

    await expect(SearchPage.destinationBlock).toBeVisible({ timeout: 5_000 });
    await expect(SearchPage.destinationBlockCity).toHaveText('Moscow, Russia');
    await expect(SearchPage.header).toContainText('Moscow'); // 2 заголовка – о поиске, пока загрузка, и результатах
});

test("empty results list if favourites active", async ({ page }) => {
    const SearchPage = new SERP(page);

    await SearchPage.fav.click();
    await expect(SearchPage.emptyResults).toBeVisible();
    await expect(SearchPage.emptyResultsFilters).toBeVisible();
    await expect(SearchPage.emptyResultsFilterRemoveButton).toBeEnabled();
});

[
    { tab: 'hotels', expectedTab: 'tabHotels' },
    { tab: 'aparts', expectedTab: 'tabAparts' },
    { tab: 'all', expectedTab: 'tabAll' },
].forEach(({ tab, expectedTab }) => {
    test(`tab ${tab} – filters for hotels and aparts`, async ({ page }) => {
        const SearchPage = new SERP(page);

        await SearchPage.activeTabChangeTo(tab);
        await expect(SearchPage.emptyResults).not.toBeVisible();
        await expect(SearchPage.header).toContainText('Moscow');
        await expect(SearchPage[expectedTab]).toHaveClass(SearchPage.activeTab);
    });
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

    await SearchPage.paymentTypesFreeCancel.click(); // выбираем в фильтрах одно значение

    await expect(SearchPage.hotelCard).toBeVisible();
    await expect(SearchPage.hotelCardName).toBeEnabled(); // чтобы точно убедиться, что карточка прогрузилась

    await expect(SearchPage.hotelCardValueAddsList).toContainText('Free cancellation');
});

test("check filter – hotel name – valid", async ({ page }) => {
    const SearchPage = new SERP(page);

    const validHotelNameStr = 'Abc '
    await expect(SearchPage.hotelNameFilter).toBeVisible({ timeout: 10_000 });
    await SearchPage.hotelNameFilter.fill(validHotelNameStr);

    await expect(SearchPage.titleWithFilters).toHaveText('with the applied filters:');
    await expect(SearchPage.hotelCard).toBeVisible({ timeout: 30_000 }); // работает куда стабильнее только с таким таймингом :(
    await expect(SearchPage.hotelCardName).toBeEnabled();

    await expect(SearchPage.hotelCardName).toContainText(validHotelNameStr);
    await expect(SearchPage.filterUnderTitle).toHaveText(validHotelNameStr);
});

test("check filter – hotel name – invalid, empty results", async ({ page }) => {
    const SearchPage = new SERP(page);

    const invalidHotelNameStr = ';0_'
    await expect(SearchPage.hotelNameFilter).toBeVisible();
    await SearchPage.hotelNameFilter.fill(invalidHotelNameStr);

    await expect(SearchPage.hotelCard).toBeVisible();
    await expect(SearchPage.hotelCardName).toBeEnabled();

    await expect(SearchPage.emptyResults).toBeVisible();
    await expect(SearchPage.emptyResultsFilters).toBeVisible();
    await expect(SearchPage.emptyResultsFilterRemoveButton).toBeEnabled();
    await expect(SearchPage.emptyResultsFilterHotelNameStr).toHaveText(invalidHotelNameStr);
});

test("check filter – full hotel name – valid", async ({ page }) => {
    const SearchPage = new SERP(page);

    const validFullHotelNameStr = 'Abc Apartments Apart Hotel'
    await expect(SearchPage.hotelNameFilter).toBeVisible();
    await SearchPage.hotelNameFilter.fill(validFullHotelNameStr);

    await expect(SearchPage.titleWithFilters).toHaveText('with the applied filters:');

    await expect(SearchPage.hotelCard).toBeVisible({ timeout: 10_000 });
    await expect(SearchPage.hotelCardName).toBeEnabled();

    await expect(SearchPage.hotelCardName).toContainText(validFullHotelNameStr);
    await expect(SearchPage.filterUnderTitle).toHaveText(validFullHotelNameStr);
});
