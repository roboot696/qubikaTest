import { Page, expect, Browser } from "@playwright/test";


export class DashboardPage{
readonly locators:{
    contributionsLink:"[href='\#\/contributions']",
}

    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCategories(){
        await this.page.getByRole('link', { name: 'Tipos de Categorias' }).click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.page.locator(".border-0.card-header")).toContainText("Tipos de categorías")
    }

}
