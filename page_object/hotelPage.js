

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
        this.sideBookingForm = page.locator('//*[contains (@class, "ApartSidebar_container__")]'); // весь контейнер
        this.bookingOptions = page.locator('//*[contains (@class, "HotelSearchResult_root__")]'); // весь контейнер
        this.bookingOptionsTitle = page.locator('//*[contains (@class, "CardTitle_cardTitle__")]');
        this.bookingOption = page.locator('//*[contains (@class, "RoomGroup_wrapper__")]').first(); // первый из списка бук
        this.bookingFormPrice = page.locator('//*[contains(@class, "ApartSidebar_container__")] //*[contains (@class, "Price_priceAmount__")]');

    }

    async goto(url) {
        await this.page.goto(url);
    }
}