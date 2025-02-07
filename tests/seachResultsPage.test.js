import { test, expect } from '@playwright/test';
import {SERP} from "../page_object/seachResultsPage.js";


test("main elements on search results page", async ({ page }) => {
    const SearchPage = new SERP(page);
    await SearchPage.goto()

    await SearchPage.destinationInput.fill('Prague');

    await expect(SearchPage.title).toBeVisible()
    await expect(SearchPage.checkinInput).toHaveText('Feb 8, 2025');
    await expect(SearchPage.checkoutInput).toHaveText('Feb 9, 2025');
    await expect(SearchPage.guests).toHaveText('2 guests');
});