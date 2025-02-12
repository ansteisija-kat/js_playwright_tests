import { test, expect } from '@playwright/test';
import { HotelPage } from "../page_object/hotelPage.js";
import { OstrovokMainPage } from "../page_object/mainPage.js";

let mainPageUrl = 'https://ostrovok.ru/?lang=en';

test("from main to hotel page with chosen hotel", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    const HP = new HotelPage(page);

    await MainPage.goto(mainPageUrl);
    await MainPage.fillDestinationHotel();
    await MainPage.searchButton.click();

    await expect(page.url()).toContain('https://ostrovok.ru/hotel/russia/moscow/');
    await expect(page.url()).toContain('/abc_apartments_apart_hotel/');
    await expect(HP.hotelHeader).toBeVisible();
    await expect(HP.hotelHeaderName).toHaveText('Abc Apartments Apart Hotel');
});