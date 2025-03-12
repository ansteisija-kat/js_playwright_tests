import { expect } from "@playwright/test";
import { OstrovokMainPage } from "./mainPage.js";


export class HotelPage {

    constructor(page) {
        this.page = page;

        this.hotelHeader = page.locator('//*[contains (@class, "HotelHeader_header__")]'); // весь контейнер
        this.hotelHeaderName = page.locator('//*[contains (@class, "HotelHeader_name__")]');
        this.hotelHeaderPrice = page.locator('//*[contains (@class, "HotelHeader_priceTitle__")]');
        this.hotelHeaderPriceButton = page.locator('//*[contains (@class, "Price_priceButton__")]');
        this.hotelAmenitiesTitle = page.locator('//*[contains (@class, "Perks_title__")]'); // тайтл
        this.hotelAmenities = page.locator('//*[contains (@class, "Perks_amenities__")]'); // весь список
        this.hotelAmenitiesLinktoList = page.locator('//*[contains (@class, "Perks_link__")]').first();
        this.hotelAmenitiesFullList = page.locator('//*[contains (@class, "Amenities_amenities__")]').last(); // весь контейнер
        this.ratePrice = page.locator('//*[contains(@class, "Rates_cell_price__")] //*[contains (@class, "Price_priceAmount__")]').first(); // пока только 1ый рейт
        this.sideBookingForm = page.locator('//*[contains (@class, "ApartSidebar_container__")]'); // весь контейнер
        this.bookingOptions = page.locator('//*[contains (@class, "HotelSearchResult_root__")]'); // весь контейнер
        this.bookingOptionsTitle = page.locator('//*[contains (@class, "CardTitle_cardTitle__")]');
        this.bookingOption = page.locator('//*[contains (@class, "RoomGroup_wrapper__")]').first(); // первый из списка бук
        this.bookingFormPrice = page.locator('//*[contains(@class, "ApartSidebar_container__")] //*[contains (@class, "Price_priceAmount__")]');
        this.bookingFormGuests = page.locator('//*[contains(@class, "Input_control__")]').last();
        this.popupSearchForm = page.getByTestId('search-form-popup');
        this.popupSearchFormSearchButton = page.getByTestId('search-button');
        this.popupSearchFormGuests = page.getByTestId('guests-input');
        this.popupSearchFormGuestsEditForm = page.locator('//*[contains(@class, "Form_rooms__")]'); // весь контейнер
        this.popupSearchFormGuestsEditFormMinusButton = page.locator('//*[contains(@class, "Counter_countButton__")]').first();
        this.popupSearchFormGuestsEditFormPlusButton = page.locator('//*[contains(@class, "Counter_countButton__")]').last();
        this.popupSearchFormGuestsEditFormValue = page.locator('//*[contains(@class, "Counter_value__")]');
        this.popupSearchFormGuestsEditFormDoneButton = page.locator('//*[contains(@class, "Form_button__")]');

    }

    async goto(url) {
        await this.page.goto(url);
    }

    async fromMainPage(page) {
        // на мейн пейдже само действие перехода, тут – ожидания и дефолтная проверка урла
        const MainPage = new OstrovokMainPage(page);
        await MainPage.toHotelPage();

        await expect(page.url()).toContain('https://ostrovok.ru/hotel/russia/moscow/');
        await expect(page.url()).toContain('/abc_apartments_apart_hotel/');
        await expect(this.hotelHeader).toBeVisible();
        await expect(this.hotelHeaderName).toBeVisible();
        // await expect(this.hotelHeaderPriceButton).toBeEnabled();

    }

}