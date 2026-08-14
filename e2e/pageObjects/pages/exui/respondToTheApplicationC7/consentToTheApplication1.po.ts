import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { EventPage } from "../eventPage.po.ts";

export class ConsentToTheApplicationPage1 extends EventPage {
  private readonly headingH3: Locator = this.page.locator(
    Selectors.h3,
    {
      hasText: "Respond to the application ",
    },
  );
  private readonly textP1English = this.page.getByText(
    "This online response combines forms C7 and C8. It also allows you to make your own allegations of harm and violence(C1A) in the section of safety concerns.",
  );
  private readonly textP1Welsh = this.page.getByText(
    "Mae'r ymateb ar-lein hwn yn cyfuno ffurflenni C7 a C8. Mae hefyd yn caniatáu ichi wneud eich honiadau eich hun o niwed a thrais (C1A) yn yr adran pryderon diogelwch.",
  );
  private readonly consentToTheApplication = this.page.getByText(
    "1. Consent to the Application / Caniatâd i'r Cais",
  );

  async goToPage(): Promise<void> {
      await this.page.getByRole("tab", { name: "Respondent 1 tasks" }).click();
  }

constructor(page: Page) {
    super(page, "Do you give your consent?");
}

  async assertPageContents(): Promise<void> {
    await expect(this.headingH3).toBeVisible();
    await expect(this.textP1English).toBeVisible();
    await expect(this.textP1Welsh).toBeVisible();
    await expect(this.consentToTheApplication).toBeVisible();
//to add actions
  }
}
