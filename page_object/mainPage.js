 import { expect } from '@playwright/test';


 const mainPageUrl = "https://ostrovok.ru/?lang=en"


 export class OstrovokMainPage {

    constructor(page) {
        this.page = page;

        this.title = page.locator('.homepage-block-title');
        this.destinationInput = page.getByPlaceholder('City, hotel or airport');
        this.checkinInput = page.getByTestId('date-start-input');
        this.checkoutInput = page.getByTestId('date-end-input');
        this.dateInputs = page.locator('//*[contains (@class, "Datepicker-module__group--")]');
        this.guests = page.getByTestId('guests-input'); // значение
        this.destinationSelectList = page.locator('//*[contains (@class, "Popup-module__popup--")]').last();
        this.destinationListItemRegion = page.locator('//*[contains (@class, "Suggest-module__region_active--")]');
        this.destinationListItemHotels = page.locator('//*[contains (@class, "Suggest-module__hotel_active--")]');
        this.searchButton = page.getByTestId('search-button');
        this.leisureOption = page.getByText('Leisure', { exact: true });
        this.businessOption = page.getByText('Business', { exact: true });
    }

    async goto() {
        await this.page.goto(mainPageUrl);
    }

    async fillDestinationEu() {
        // контроль маленькими шагами, потому что автоселект по введенной строке не всегда срабатывает
        await this.destinationInput.pressSequentially('Prague ');
        await expect(this.destinationSelectList).toBeVisible();
        await expect(this.destinationListItemRegion).toHaveText('Prague, Czech Republic');
        await this.destinationListItemRegion.click();
    }

     async fillDestinationHotel() {
         // контроль маленькими шагами, потому что автоселект по введенной строке не всегда срабатывает
         await this.destinationInput.pressSequentially('Abc Apartments Apart Hotel ');
         await expect(this.destinationSelectList).toBeVisible();
         await expect(this.destinationListItemHotels).toContainText('ABC Apartments');
         await this.destinationListItemHotels.click();
     }

    async toSearchPageWithDefaultDestination() {
        // если destination не заполняется вручную, по первому клику кнопки вставляется дефолтное значение Moscow, Russia
        await this.searchButton.dblclick();
    }

     async toHotelPage() {
         await this.goto();
         await this.fillDestinationHotel();
         await this.searchButton.click();
     }

     async getBothDates() {
        await this.goto();

        const textFirst = await this.checkinInput.innerText();
        const textSecond = await this.checkoutInput.innerText();
        this.dates = [ textFirst, textSecond ];

        return this.dates;
     }

}