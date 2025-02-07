import { expect } from '@playwright/test';


// const searchResultsPageUrl = "https://ostrovok.ru/hotel/"


export class SERP {
    // /**
    //  @param {import('@playwright/test').Page} page
    //  */
    // без этого заработало, с этим импорт не работает ??

    constructor(page) {
        this.page = page;

        this.destinationBlock = page.locator('.zenregioninfo').first();
        this.destinationBlockCity = page.locator('p.zenregioninfo-region').first();
        this.destinationBlockDates = page.locator('p.zenregioninfo-dates').first();
        this.destinationBlockGuestRooms = page.locator('p.zenregioninfo-rooms').first();
        this.destinationBlockEditIcon = page.locator('.zenregioninfo-lens').first(); // лупа

        this.tabAll = page.getByText('All');
        this.tabHotels = page.getByText('Hotels');
        this.tabAparts = page.getByText('Apartments');
        this.title = page.locator('p.zenserpresult-header');
        this.hotelsList = page.locator('.hotels').first();

    }

    // async goto() {
    //     await this.page.goto(searchResultsPageUrl);
    // }



}
