

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
        // this.destinationBlockDatesText = (page.locator('p.zenregioninfo-dates').first()).innerText();
        this.destinationBlockGuestRooms = page.locator('p.zenregioninfo-rooms').first();
        this.destinationBlockEditIcon = page.locator('.zenregioninfo-lens').first(); // лупа

        this.tabAll = page.locator('//*[contains (@class, "Tabs__tab--")]').filter({ hasText: 'All' });
        this.tabHotels = page.locator('//*[contains (@class, "Tabs__tab--")]').filter({ hasText: 'Hotels' });
        this.tabAparts = page.locator('//*[contains (@class, "Tabs__tab--")]').filter({ hasText: 'Apartments' });
        this.header = page.locator('p.zenserpresult-header');
        this.hotelsList = page.locator('.hotels').first();
        this.emptyResults = page.locator('.emptyserpfiltered');
        this.emptyResultsTitle = page.locator('.emptyserpfiltered-title');
        this.emptyResultsText = page.locator('.emptyserpfiltered-text');
        this.emptyResultsFilters = page.locator('.emptyserpfiltered-filters');
        this.emptyResultsFilterRemoveButton = page.locator('.appliedfilter-remove');
        this.emptyResultsFilterHotelNameStr = page.locator('.appliedfilter-subtitle');
        this.titleWithFilters = page.locator('.zenserpresult-title');
        this.filterUnderTitle = page.locator('.zen-serpresultfilter-label'); // фильтр при наличии активного
        this.filterUnderTitleRemoveButton = page.locator('.zen-serpresultfilter-icon'); // крестик для очистки фильтра
        this.newResultsUp = page.locator('.emptyserphotelstip-inner'); // контейнер весь
        this.newResultsUpButton = page.locator('.emptyserphotelstip-link'); // кнопка "Up"

        // leftbar
        this.fav = page.locator('.zen-hotels-filter-favorites');
        this.paymentTypes = page.locator('zen-hotels-filter-paymenttypes'); // весь контейнер
        // this.paymentTypeFreeCancel = page.locator('.zencheckbox #freecancellation'); // один из вариантов
        this.paymentTypesFreeCancel = page.locator('.zen-filter-checkbox-field').filter({ hasText: 'Free cancellation available' }); // по id не тыкалось, рабочий вариант такой
        this.hotelName = page.locator('.zen-hotels-filter-hotelname'); // весь контейнер
        this.hotelNameFilter = page.getByPlaceholder('For example, Hilton'); // инпут
        this.meals = page.locator('.zen-hotels-filter-mealtypes'); // весь контейнер
        this.mealsNomeals = page.locator('.zen-filter-checkbox-field').filter({ hasText: 'No meals included' });
        this.mealsAllInc = page.locator('.zen-filter-checkbox-field').filter({ hasText: 'All-inclusive' });

        // hotel cards
        this.hotelCard = page.getByTestId('serp-hotelcard').first(); // вообще для подсчета кол-ва и тп, не для индивидуальной логики – но пока 1 карточку сделаем
        this.hotelCardImage = page.locator('.zenmobilegallery-photo-container').first();
        this.hotelCardName = page.locator('a.zen-hotelcard-name-link').first();
        this.hotelCardAddress = page.locator('p.zen-hotelcard-address').first();
        this.hotelCardFavButton = page.locator('.zen-hotelcard-favorite-inner').first();
        this.hotelCardRate = page.locator('a.zen-hotelcard-rating-total').first(); // тут можно вытащить текстом саму цифру
        this.hotelCardAmenitiesIcon = page.locator('.zen-hotelcard-content-amenities-list').first();
        this.hotelCardValueAddsList = page.locator('.valueadds-short').first(); // в теории можно вытащить дочерние li эл-ты плюшек
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async activeTabChangeTo(tab: { all, hotels, aparts }) {
        tab.all = this.tabAll;
        tab.hotels = this.tabHotels;
        tab.aparts = this.tabAparts;
        await tab.click();
    }
}
