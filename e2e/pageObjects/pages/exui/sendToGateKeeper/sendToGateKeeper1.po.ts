import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export interface SendToGateKeeperParams {
  sendToSpecificGateKeeper: boolean;
  specificJudgeOrLegalAdviser?: string;
  anyJudgeOrLegalAdviser?: string;
  judgeName?: string;
  judgeEmail?: string;
  legalAdviserName?: string;
  legalAdviserEmail?: string;
}

export class SendToGateKeeper1Page extends EventPage {
  private readonly letGateKeepersKnowSubHeading: Locator = this.page.getByRole(
    "heading",
    {
      name: "Let the gatekeepers know there’s a new case",
    },
  );
  private readonly sendToGateKeeperLabel: Locator = this.page.getByText(
    "Who do you want to send the case to?",
  );
  private readonly optionHint: Locator =
    this.page.getByText("Select an option");
  private readonly judgeLabel: Locator = this.page.getByText(
    "Send to a specific judge",
  );
  private readonly legalAdviserLabel: Locator = this.page.getByText(
    "Send to a specific legal adviser",
  );
  private readonly judgeOrLegalAdviserLabel: Locator = this.page.getByText(
    "Send to any judge or legal adviser",
  );

  private readonly nameOfJudgeLabel: Locator =
    this.page.getByText("Name of the judge");
  private readonly nameOfLegalAdviserLabel: Locator = this.page.getByText(
    "Name of legal adviser",
    { exact: true },
  );

  private readonly selectAllHint: Locator = this.page.getByText(
    "Select all that apply",
  );
  private readonly sendToAnyJudgeLabel: Locator =
    this.page.getByText("Send to a judge");
  private readonly sendToAnyLALabel: Locator = this.page.getByText(
    "Send to a legal adviser",
  );

  constructor(page: Page) {
    super(page, "Send to gatekeeper");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.letGateKeepersKnowSubHeading).toBeVisible();
    await expect(this.sendToGateKeeperLabel).toBeVisible();
    await expect(this.optionHint).toBeVisible();
    await expect(this.judgeLabel).toBeVisible();
    await expect(this.legalAdviserLabel).toBeVisible();
    await expect(this.judgeOrLegalAdviserLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(params: SendToGateKeeperParams): Promise<void> {
    if (params.sendToSpecificGateKeeper) {
      //Send to specific judge or legal adviser
      await this.page.getByLabel(params.specificJudgeOrLegalAdviser).check();
      if (params.specificJudgeOrLegalAdviser === "Send to a specific judge") {
        await expect(this.nameOfJudgeLabel).toBeVisible();
        await this.page
          .getByRole("combobox", { name: "Name of the judge" })
          .fill(params.judgeName);
        // Wait for the judge option in the dropdown to become visible using dynamic content
        const judgeNameDropdownOption = this.page.locator("mat-option", {
          hasText: `${params.judgeName} (${params.judgeEmail})`,
        });
        await expect(judgeNameDropdownOption).toBeVisible();
        // Click the option containing the judge name (dynamic value)
        await judgeNameDropdownOption.click();
      } else {
        await expect(this.nameOfLegalAdviserLabel).toBeVisible();
        await this.page
          .getByRole("combobox", { name: "Name of legal adviser" })
          .fill(params.legalAdviserName);
        // Wait for the legal adviser option in the dropdown to become visible using dynamic content
        const legalAdviserNameDropdownOption = this.page.locator("mat-option", {
          hasText: `${params.legalAdviserName} (${params.legalAdviserEmail})`, // include email to differentiate from other users with names containing the same string
        });
        await expect(legalAdviserNameDropdownOption).toBeVisible();
        // Click the option containing the legal adviser name (dynamic value)
        await legalAdviserNameDropdownOption.click();
      }
    } else {
      //Send to any judge or legal adviser or both
      await this.selectAnyGateKeeper(params);
    }
  }

  async selectAnyGateKeeper(params: SendToGateKeeperParams): Promise<void> {
    await this.page
      .getByRole("radio", { name: "Send to any judge or legal adviser" })
      .check();
    await expect(this.selectAllHint).toBeVisible();
    await expect(this.sendToAnyJudgeLabel).toBeVisible();
    await expect(this.sendToAnyLALabel).toBeVisible();

    if (
      params.anyJudgeOrLegalAdviser === "Send to a judge" ||
      params.anyJudgeOrLegalAdviser === "Send to a legal adviser"
    ) {
      await this.page
        .getByRole("checkbox", { name: params.anyJudgeOrLegalAdviser })
        .check();
    } else {
      await this.page
        .getByRole("checkbox", { name: "Send to a judge" })
        .check();
      await this.page
        .getByRole("checkbox", { name: "Send to a legal adviser" })
        .check();
    }
  }
}
