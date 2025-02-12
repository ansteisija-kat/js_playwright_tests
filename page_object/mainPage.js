 import { expect } from '@playwright/test';


 const mainPageUrl = "https://ostrovok.ru/?lang=en"


 export class OstrovokMainPage {
    // /**
    //  @param {import('@playwright/test').Page} page
    //  */
    // без этого заработало, с этим импорт не работает ??

    constructor(page) {
        this.page = page;

        this.title = page.locator('.homepage-block-title');
        this.destinationInput = page.getByPlaceholder('City, hotel or airport');
        this.checkinInput = page.getByTestId('date-start-input');
        this.checkoutInput = page.getByTestId('date-end-input');
        this.guests = page.getByTestId('guests-input'); // значение

        this.logo = page.getByTestId('header-logo-link');
        this.language = page.getByTestId('language-widget-control');
        this.languageItem = page.getByTestId('language-widget-item').first();
        this.currency = page.locator('//*[contains (@class, "CurrencyWidget-module__control--")]');
        this.askSupport = page.locator('//*[contains (@class, "SupportWidget-module__control--")]');
        this.feedbackButton = page.getByText('Feedback form');
        this.loginButton = page.locator('//*[contains (@class, "Control-module__control--")]');
        this.loginInput = page.getByTestId('user-widget-sign-in-email-input');
        this.burgerButton = page.getByTestId('menu-widget-control');
        this.burgerMenu = page.locator('//*[contains (@class, "MenuWidget-module__content--")]');

        this.destinationInput = page.getByPlaceholder('City, hotel or airport');
        this.destinationSelectList = page.locator('//*[contains (@class, "Popup-module__popup--")]').last();
        this.destinationListItemRegion = page.locator('//*[contains (@class, "Suggest-module__region_active--")]');
        this.destinationListItemHotels = page.locator('//*[contains (@class, "Suggest-module__hotel_active--")]');
        this.searchButton = page.getByTestId('search-button');
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
         await expect(this.destinationListItemHotels).toContainText('Abc Apartments Apart Hotel');
         await this.destinationListItemHotels.click();
     }

    async toSearchPageWithDefaultDestination() {
        // тк не заполняется destination вручную, по первому клику вставляется дефолтное значение Moscow, Russia
        await this.searchButton.dblclick();
    }

    async headerSupportOpenPopupWithButton() {
        await this.askSupport.click();
        await expect(this.feedbackButton).toBeEnabled();
    }

    async headerBurgerOpenList() {
        await this.burgerButton.click();
        await expect(this.burgerMenu).toBeEnabled();
    }

}