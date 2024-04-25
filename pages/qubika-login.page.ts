import { Page, expect, Locator } from "@playwright/test";
import { url } from "inspector";

export class LoginPage {
  readonly locators = {
    alertDialog: "div[role='alertdialog']",
    formLogin: ".card-body.px-lg-5.py-lg-5",
    buttonAuth: 'button:has-text("Autenticar")',
  };
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async loginInvalid() {
    await expect(
      this.page.locator(".card-body.px-lg-5.py-lg-5")
    ).toBeInViewport();
    await this.page
      .getByPlaceholder("Usuario o correo electrónico")
      .fill("andrea.silbelgmail.com");
    await this.page.getByPlaceholder("Contraseña").click();
    await this.page.getByPlaceholder("Contraseña").fill("1234567");
    await this.page.click(this.locators.buttonAuth);
    await this.page.waitForSelector(this.locators.alertDialog);
    await expect(this.page.locator(this.locators.alertDialog)).toContainText(
      "Usuario o contraseña incorrectos"
    );
  }

  async loginValid() {
    await expect(this.page.locator(this.locators.formLogin)).toBeInViewport();
    await this.page
      .getByPlaceholder("Usuario o correo electrónico")
      .fill("andrea.silbel@gmail.com");
    await this.page.getByPlaceholder("Contraseña").click();
    await this.page.getByPlaceholder("Contraseña").fill("12345678");

    await this.page.click(this.locators.buttonAuth);
    await expect(this.page.locator(".navbar-brand.pt-0")).toBeInViewport();
  }
}
