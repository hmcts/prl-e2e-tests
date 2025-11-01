import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { EventPage } from "../eventPage.po.js";

export class WithdrawApplicationEvent1Page extends EventPage {
  readonly withdrawApplicationRadioYes: Locator = this.page.locator(
    "#withDrawApplicationData_withDrawApplication_Yes",
  );
  readonly withdrawApplicationRadioNo: Locator = this.page.locator(
    "#withDrawApplicationData_withDrawApplication_No",
  );
  readonly withdrawApplicationReason: Locator = this.page.locator(
    "#withDrawApplicationData_withDrawApplicationReason",
  );

  readonly headingText2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Are you sure you want to withdraw this application?",
  });

  readonly courtFeeConsentHeadingText: Locator = this.page.locator(
    Selectors.p,
    {
      hasText: "If you have paid a court fee, you will not get a refund.",
    },
  );

  readonly warningText: Locator = this.page.locator(
    Selectors.GovukWarningText,
    {
      hasText:
        "Once you have withdrawn this application you cannot resubmit it.",
    },
  );

  constructor(page: Page) {
    super(page, "Withdraw application");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.headingText2).toBeVisible();
    await expect(this.courtFeeConsentHeadingText).toBeVisible();
    await expect(this.warningText).toBeVisible();
    await expect(this.withdrawApplicationRadioYes).toBeVisible();
    await expect(this.withdrawApplicationRadioNo).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async selectWithdrawApplication(withdrawApplication: boolean): Promise<void> {
    if (withdrawApplication) {
      await this.withdrawApplicationRadioYes.click();
      await expect(this.withdrawApplicationReason).toBeVisible();
      await this.withdrawApplicationReason.fill(
        "This is my reason to withdraw the application",
      );
    } else {
      await this.withdrawApplicationRadioNo.click();
    }
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
