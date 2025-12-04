import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class C100Noc1Page extends EventPage {
  private readonly caseNumberField: Locator = this.page.locator("#caseRef");
  private readonly textLabel1: Locator = this.page.locator(Selectors.p, {
    hasText:
      "You can use this notice of change (sometimes called a 'notice of acting') to get access to the digital case file in place of:",
  });
  private readonly textLabel2: Locator = this.page.locator(Selectors.li, {
    hasText: "a client acting in person",
  });
  private readonly textLabel3: Locator = this.page.locator(Selectors.li, {
    hasText: "a legal representative previously acting on your client's behalf",
  });
  private readonly textLabel4: Locator = this.page.locator(Selectors.Span, {
    hasText: "Online case reference number",
  });
  private readonly govUkHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText:
      " This is a 16-digit number from MyHMCTS, for example 1111-2222-3333-4444",
  });

  constructor(page: Page) {
    super(page, "Notice of change");
  }

  async assertPageContents(): Promise<void> {
    await expect(this.textLabel1).toBeVisible();
    await expect(this.textLabel2).toBeVisible();
    await expect(this.textLabel3).toBeVisible();
    await expect(this.textLabel4).toBeVisible();
    await expect(this.govUkHint).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInCaseNumber(caseNumber: string): Promise<void> {
    await this.caseNumberField.fill(caseNumber);
  }
}
