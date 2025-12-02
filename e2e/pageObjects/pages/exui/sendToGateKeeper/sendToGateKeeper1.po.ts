import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { JudgeAndLegalAdviser } from "../../../../common/types.js";

export interface SendToGateKeeperParams {
  sendToSpecificGateKeeper: boolean;
  judgeOrLegalAdviser?: JudgeAndLegalAdviser;
  judgeName?: string;
  legalAdviserDropdownName?: string;
  legalAdviserDisplayName?: string;
}

export class SendToGateKeeper1Page extends EventPage {
  private readonly letGateKeepersKnowSubHeading: Locator = this.page.getByRole(
    "heading",
    {
      name: "Let the gatekeepers know there’s a new case",
    },
  );
  private readonly sendToGateKeeperHint: Locator = this.page.getByText(
    "This will send the case to the gatekeepers for your court or area, or to a specific gatekeeper.",
  );
  private readonly isSpecificGateKeeperNeededLabel: Locator =
    this.page.getByText(
      "Do you want to send this case to a specific gatekeeper?",
    );
  private readonly yesLabel: Locator = this.page.getByText("Yes", {
    exact: true,
  });
  private readonly noLabel: Locator = this.page.getByText("No", {
    exact: true,
  });
  private readonly judgeOrLegalAdviserLabel: Locator = this.page.getByText(
    "Judge or legal adviser?",
  );
  private readonly nameOfJudgeLabel: Locator =
    this.page.getByText("Name of the judge");
  private readonly nameOfLegalAdviserLabel: Locator = this.page.getByText(
    "Name of legal adviser",
  );

  constructor(page: Page) {
    super(page, "Send to gatekeeper");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.letGateKeepersKnowSubHeading).toBeVisible();
    await expect(this.sendToGateKeeperHint).toBeVisible();
    await expect(this.isSpecificGateKeeperNeededLabel).toBeVisible();
    await expect(this.yesLabel).toBeVisible();
    await expect(this.noLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(params: SendToGateKeeperParams): Promise<void> {
    await this.page
      .getByRole("group", {
        name: "Do you want to send this case to a specific gatekeeper?",
      })
      .getByLabel(params.sendToSpecificGateKeeper ? "Yes" : "No")
      .check();
    if (params.sendToSpecificGateKeeper) {
      await expect(this.judgeOrLegalAdviserLabel).toBeVisible();
      await this.page
        .getByRole("group", {
          name: "Judge or legal adviser?",
        })
        .getByLabel(params.judgeOrLegalAdviser)
        .check();
      if (params.judgeOrLegalAdviser === "Judge") {
        await expect(this.nameOfJudgeLabel).toBeVisible();
        await this.page
          .getByRole("combobox", { name: "Name of the judge" })
          .fill(params.judgeName);
        // Wait for the judge option in the dropdown to become visible using dynamic content
        const judgeNameDropdownOption = this.page.locator(".mat-option-text", {
          hasText: params.judgeName,
        });
        await expect(judgeNameDropdownOption).toBeVisible();
        // Click the option containing the judge name (dynamic value)
        await judgeNameDropdownOption.click();
      } else {
        await expect(this.nameOfLegalAdviserLabel).toBeVisible();
        await this.page
          .locator("#legalAdviserList")
          .selectOption(params.legalAdviserDropdownName);
      }
    }
  }
}
