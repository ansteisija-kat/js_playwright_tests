import {expect} from "@playwright/test";

export class Header {
    // /**
    //  @param {import('@playwright/test').Page} page
    //  */
    // без этого заработало, с этим импорт не работает ??

    constructor(page) {
        this.page = page;

        this.logo = page.getByTestId('header-logo-link');
        this.widgets = page.locator('//*[contains(@class, "Widgets_widgets__")]');
        this.language = page.getByTestId('language-widget-control');
        this.languageItem = page.getByTestId('language-widget-item').first();
        this.currencyMainPage = page.locator('//*[contains (@class, "CurrencyWidget-module__control--")]');
        this.currencyOtherPage = page.locator('//*[contains(@class, "CurrencyWidget_control__")]');
        this.currencyWidget = page.locator('//*[contains (@class, "CurrencyWidget_select__")]');
        this.currencyEuro = page.getByRole('button', {name: 'EUR Euro , €'}).first();
        this.askSupport = page.locator('//*[contains (@class, "SupportWidget-module__control--")]');
        this.feedbackButton = page.getByText('Feedback form');
        this.loginButton = page.locator('//*[contains (@class, "Control-module__control--")]');
        this.loginInput = page.getByTestId('user-widget-sign-in-email-input');
        this.burgerButton = page.getByTestId('menu-widget-control');
        this.burgerMenu = page.locator('//*[contains (@class, "MenuWidget-module__content--")]');
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