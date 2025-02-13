

export class HotelPage {
    // /**
    //  @param {import('@playwright/test').Page} page
    //  */
    // без этого заработало, с этим импорт не работает ??

    constructor(page) {
        this.page = page;

        this.hotelHeader = page.locator('//*[contains (@class, "HotelHeader_header__")]'); // весь контейнер
        this.hotelHeaderName = page.locator('//*[contains (@class, "HotelHeader_name__")]');
        this.hotelHeaderPrice = page.locator('//*[contains (@class, "HotelHeader_priceTitle__")]');
        this.hotelAmenitiesTitle = page.locator('//*[contains (@class, "Perks_title__")]'); // тайтл
        this.hotelAmenities = page.locator('//*[contains (@class, "Perks_amenities__")]'); // весь список
        this.hotelAmenitiesLinktoList = page.locator('//*[contains (@class, "Perks_link__")]').first();
        this.hotelAmenitiesFullList = page.locator('//*[contains (@class, "Amenities_amenities__")]').last(); // весь контейнер
        this.ratePrice = page.locator('//*[contains(@class, "Rates_cell_price__")] //*[contains (@class, "Price_priceAmount__")]').first(); // пока только 1ый рейт
        // TODO сделать отдельные локаторы для всех рейтов или найти способ проверять одинаковые элементы
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
}