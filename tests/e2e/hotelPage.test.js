import { test, expect } from '@playwright/test';
import { HotelPage } from "../../page_object/hotelPage.js";
import { Header } from "../../page_object/header.js";


test.beforeEach(async ({ page }) => {
    const HP = new HotelPage(page);
    await HP.fromMainPage(page);
});

test("from main to hotel page with chosen hotel", async ({ page }) => {
    const HP = new HotelPage(page);

    await expect(HP.hotelHeaderName).toHaveText('Abc Apartments Apart Hotel');
});

test("booking form fields", async ({ page }) => {
    const HP = new HotelPage(page);
    await expect(HP.sideBookingForm).toBeVisible();

    await expect(HP.bookingFormGuests).toHaveText('2 guests');
    await HP.bookingFormGuests.click();
    await expect(HP.popupSearchForm).toBeVisible();
    await expect(HP.popupSearchFormGuests).toHaveText('2 guests');
    await HP.popupSearchFormGuests.click();
    await expect(HP.popupSearchFormGuestsEditFormValue).toHaveText('2'); // значение до
    await HP.popupSearchFormGuestsEditFormPlusButton.click();
    await expect(HP.popupSearchFormGuestsEditFormValue).toHaveText('3'); // значение после добавления еще взрослого гостя
    await expect(HP.popupSearchFormGuests).toHaveText('3 guests'); // автоматом значение меняется и в попапе тоже
    await HP.popupSearchFormGuestsEditFormDoneButton.click();
    await expect(HP.popupSearchFormGuestsEditForm).not.toBeVisible(); // закрылась форма редактирования гостей
    await HP.popupSearchFormSearchButton.click(); // запускаем обновление поиска рейтов в отеле

    await expect(HP.popupSearchForm).not.toBeVisible();
    await expect(HP.bookingFormGuests).toHaveText('3 guests');
    await expect(page.url()).toContain('guests=3');
});

test("other amenities scroll", async ({ page }) => {
    const HP = new HotelPage(page);

    await expect(HP.sideBookingForm).toBeVisible();
    await HP.hotelAmenitiesLinktoList.click();
    await expect(HP.hotelAmenitiesFullList).toBeInViewport();
    await expect(HP.hotelAmenitiesLinktoList).not.toBeInViewport();
});

test("changing currency in header changes it everywhere at hotel page", async ({ page }) => {
    const HP = new HotelPage(page);
    const HeaderElems = new Header(page);

    // меняем валюту в хэдере
    await expect(HeaderElems.widgets).toBeVisible({ timeout: 10_000 });
    await expect(HeaderElems.currencyOtherPage).toBeEnabled();
    await HeaderElems.currencyOtherPage.click();
    await HeaderElems.currencyEuro.click();

    await expect(HeaderElems.currencyWidget).not.toBeVisible();
    await expect(HP.hotelHeaderPrice).toContainText('€');
    await expect(HP.bookingFormPrice).toContainText('€');
    await expect(HP.ratePrice).toContainText('€');
});
