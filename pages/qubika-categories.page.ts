import { Page, expect, Browser } from "@playwright/test";
import exp from "constants";

export class CategoriesPage {
  readonly locators: {
    contributionsLink: "[href='#/contributions']";
    tableCategories: ".table-flush";
  };

  readonly page: Page;
  newCategoryName: string;
  constructor(page: Page) {
    this.page = page;
  }

  async addNewCategorie() {
    const currentDate = new Date();
    const suffix =
      currentDate.getHours().toString() +
      currentDate.getMinutes().toString() +
      currentDate.getSeconds().toString();
    this.newCategoryName = "test" + suffix;
    await this.page.getByRole("button", { name: "Adicionar" }).click();
    await expect(this.page.locator("[id='mat-dialog-0']")).toBeInViewport();
    await this.page
      .getByPlaceholder("Nombre de categoría")
      .fill(this.newCategoryName);
    await this.page.getByRole("button", { name: "Aceptar" }).click();
    await this.page.waitForSelector("div[role='alertdialog']");
    await expect(this.page.locator("div[role='alertdialog']")).toContainText(
      "Tipo de categoría adicionada satisfactoriamente"
    );
  }
  async createSubCategory() {
    const currentDate = new Date();
    const suffix =
      currentDate.getHours().toString() +
      currentDate.getMinutes().toString() +
      currentDate.getSeconds().toString();
    this.newCategoryName = "test" + suffix;
    await this.page.getByRole("button", { name: "Adicionar" }).click();
    await expect(this.page.locator("[id='mat-dialog-0']")).toBeInViewport();
    await this.page
      .getByPlaceholder("Nombre de categoría")
      .fill(this.newCategoryName);
    await this.page
      .locator("label")
      .filter({ hasText: "Es subcategoria?" })
      .click();
    await this.page
      .getByLabel("Adicionar tipo de categoría")
      .locator("span")
      .nth(1)
      .click();
    await this.page
      .getByRole("option", { name: "Test Futbol", exact: true })
      .first()
      .click();
    await this.page.getByRole("button", { name: "Aceptar" }).click();
    await this.page.waitForSelector("div[role='alertdialog']");
    await expect(this.page.locator("div[role='alertdialog']")).toContainText(
      "Tipo de categoría adicionada satisfactoriamente"
    );
  }

  async validateCategoryAdded() {
    var navButtons = await this.page.$$("li.page-item");
    var element = navButtons[navButtons.length - 2];
    await element.click();
   
    await this.searchElementInTable();
  }

  async searchElementInTable() {
    await this.page.waitForTimeout(5000);
    let val = this.newCategoryName;
    const cells = await this.page.$$(".table-flush td:nth-child(1)");
    let found = false;
    for (const cell of cells) {
      const textContent = await cell.textContent();
      if (textContent === val) {
        console.log(`the value ${val} was founded`);
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`the value ${val} was not founded`);
    }
  }
}
