import { expect } from '@playwright/test';


// const searchResultsPageUrl = "https://ostrovok.ru/hotel/"


export class SERP {
    // /**
    //  @param {import('@playwright/test').Page} page
    //  */
    // без этого заработало, с этим импорт не работает ??

    activeTab = /Tabs__tab_active--/  // вспомогательный класс, не бывает единственным

    constructor(page) {
        this.page = page;

        this.destinationBlock = page.locator('.zenregioninfo').first();
        this.destinationBlockCity = page.locator('p.zenregioninfo-region').first();
        this.destinationBlockDates = page.locator('p.zenregioninfo-dates').first();
        this.destinationBlockDatesText = (page.locator('p.zenregioninfo-dates').first()).innerText();
        this.destinationBlockGuestRooms = page.locator('p.zenregioninfo-rooms').first();
        this.destinationBlockEditIcon = page.locator('.zenregioninfo-lens').first(); // лупа

        this.tabAll = page.locator('//*[contains (@class, "Tabs__tab--")]').filter({ hasText: 'All' });
        this.tabHotels = page.locator('//*[contains (@class, "Tabs__tab--")]').filter({ hasText: 'Hotels' });
        this.tabAparts = page.locator('//*[contains (@class, "Tabs__tab--")]').filter({ hasText: 'Apartments' });
        this.title = page.locator('p.zenserpresult-header');
        this.hotelsList = page.locator('.hotels').first();
        this.emptyResults = page.locator('.emptyserpfiltered');
        this.emptyResultsTitle = page.locator('.emptyserpfiltered-title');
        this.emptyResultsText = page.locator('.emptyserpfiltered-text');
        this.emptyResultsFilters = page.locator('.emptyserpfiltered-filters');
        this.emptyResultsFilterRemoveButton = page.locator('.appliedfilter-remove');

        // leftbar
        this.fav = page.locator('.zen-hotels-filter-favorites');

    }

    async goto(url) {
        await this.page.goto(url);
    }

    // async getDatesFromDestinationBlock() {
    //     return this.destinationBlockDates.innerText()
    // }

}
