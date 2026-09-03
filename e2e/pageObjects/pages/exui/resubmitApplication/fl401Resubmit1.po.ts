import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export class Fl401Resubmit1Page extends EventPage {
  private readonly submissionUnderstanding: Locator = this.page.getByText(
    "I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.",
  );
  private readonly consentInputLabel: Locator = this.page.getByText(
    "The applicant believes that the facts stated in this form and any continuation sheets are true. I am authorised by the applicant to sign this statement.",
  );
  private readonly consentCheckbox: Locator = this.page.getByRole("checkbox", {
    name: "The applicant believes that the facts stated in this form and any continuation sheets are true. I am authorised by the applicant to sign this statement.",
  });
  private readonly dateLabels: string[] = ["Date", "Day", "Month", "Year"];
  private readonly dayInput: Locator = this.page.getByRole("textbox", {
    name: "Day",
  });
  private readonly monthInput: Locator = this.page.getByRole("textbox", {
    name: "Month",
  });
  private readonly yearInput: Locator = this.page.getByRole("textbox", {
    name: "Year",
  });
  private readonly fullNameLabel: Locator =
    this.page.getByText("Your full name");
  private readonly fullNameInput: Locator = this.page.getByRole("textbox", {
    name: "Your full name",
  });
  private readonly nameOfFirmLabel: Locator =
    this.page.getByText("Name of your firm");
  private readonly nameOfFirmInput: Locator = this.page.getByRole("textbox", {
    name: "Name of your firm",
  });
  private readonly signingLabel: Locator = this.page.getByText(
    "If signing on behalf of firm or company give position or office held",
  );
  private readonly signingInput: Locator = this.page.getByRole("textbox", {
    name: "If signing on behalf of firm or company give position or office held",
  });

  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  private readonly dateUtils: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page, "Statement of Truth and submit");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.submissionUnderstanding).toBeVisible();
    await expect(this.consentInputLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.dateLabels);
    await expect(this.fullNameLabel).toBeVisible();
    await expect(this.nameOfFirmLabel).toBeVisible();
    await expect(this.signingLabel).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(
    fullName: string,
    firmName: string,
    signingPosition: string,
  ): Promise<void> {
    await this.consentCheckbox.check();
    const todayDateArray: string[] = this.dateUtils.todayDate(
      false,
      true,
    ) as string[];
    await this.dayInput.fill(todayDateArray[0]);
    await this.monthInput.fill(todayDateArray[1]);
    await this.yearInput.fill(todayDateArray[2]);
    await this.fullNameInput.fill(fullName);
    await this.nameOfFirmInput.fill(firmName);
    await this.signingInput.fill(signingPosition);
  }
}
