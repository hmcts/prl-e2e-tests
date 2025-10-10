import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100Noc1Page extends EventPage {
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly caseNumberField: Locator = this.page.locator("#caseRef");

  constructor(page: Page) {
    super(page, "Notice of change");
  }

  async assertPageContents(
    govUkHeadingL: string,
    p: string,
    li1: string,
    li2: string,
    span: string,
    govUkHint: string,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.GovukHeadingL, { hasText: govUkHeadingL }),
    ).toBeVisible();
    await expect(this.page.locator(Selectors.p, { hasText: p })).toBeVisible();
    await expect(
      this.page.locator(Selectors.li, { hasText: li1 }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.li, { hasText: li2 }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: span }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.GovukHint, { hasText: govUkHint }),
    ).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInCaseNumber(caseNumber: string): Promise<void> {
    await this.caseNumberField.fill(caseNumber);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
