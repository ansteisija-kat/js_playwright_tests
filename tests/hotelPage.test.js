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

test("booking form fields", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    const HP = new HotelPage(page);
    await MainPage.goto(mainPageUrl);
    await MainPage.fillDestinationHotel();
    await MainPage.searchButton.click();
    await expect(page.url()).toContain('https://ostrovok.ru/hotel/russia/moscow/');
    await expect(page.url()).toContain('/abc_apartments_apart_hotel/');
    await expect(HP.hotelHeader).toBeVisible();
    // это все будет предусловием

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

// TODO тесты:
// изменение данных в букинг форме + проверка на букинг пейдже, что данные те же
// переход на букинг страницу из 1го рейта
// переход на букинг страницу из не-1го рейта

test("other amenities scroll", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    const HP = new HotelPage(page);
    await MainPage.goto(mainPageUrl);
    await MainPage.fillDestinationHotel();
    await MainPage.searchButton.click();
    await expect(page.url()).toContain('https://ostrovok.ru/hotel/russia/moscow/');
    await expect(page.url()).toContain('/abc_apartments_apart_hotel/');
    await expect(HP.hotelHeader).toBeVisible();
    // это все будет предусловием

    await expect(HP.sideBookingForm).toBeVisible();
    await HP.hotelAmenitiesLinktoList.click();
    await expect(HP.hotelAmenitiesFullList).toBeInViewport();
    await expect(HP.hotelAmenitiesLinktoList).not.toBeInViewport();
});

test("changing currency in header changes it everywhere at hotel page", async ({ page }) => {
    const MainPage = new OstrovokMainPage(page);
    const HP = new HotelPage(page);
    await MainPage.goto(mainPageUrl);
    await MainPage.fillDestinationHotel();
    await MainPage.searchButton.click();
    await expect(page.url()).toContain('https://ostrovok.ru/hotel/russia/moscow/');
    await expect(page.url()).toContain('/abc_apartments_apart_hotel/');
    await expect(HP.hotelHeader).toBeVisible();
    // это все будет предусловием

    // меняем валюту в хэдере
    await expect(MainPage.widgets).toBeVisible({ timeout: 10_000 });
    await expect(MainPage.currency).toBeEnabled();
    await MainPage.currency.click();
    await MainPage.currencyEuro.click();

    await expect(MainPage.currencyWidget).not.toBeVisible();
    await expect(HP.hotelHeaderPrice).toContainText('€');
    await expect(HP.bookingFormPrice).toContainText('€');
    await expect(HP.ratePrice).toContainText('€');
});


// TODO оптимизации:
// вынести хэдер в отдельный пейдж обжект
// сделать beforeEach
// сделать для серпа еще aftereach (про тесты с фильтрами)
// вынести повторяющийся код в методы пейдж обжекта