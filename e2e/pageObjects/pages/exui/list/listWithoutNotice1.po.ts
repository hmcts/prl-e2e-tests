import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class ListWithoutNotice1Page extends EventPage {
  private readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Next hearing details",
  });
  private readonly adminHearingLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Give admin hearing instructions",
    },
  );
  private readonly textArea: Locator = this.page.locator(
    "#listWithoutNoticeHearingInstruction",
  );

  constructor(page: Page) {
    super(page, "List without notice");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.adminHearingLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async giveInstructions(instruction: string) {
    await this.textArea.fill(instruction);
  }
}
