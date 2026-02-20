import { Base } from "../../../base.po";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils";
import { solicitorCaseCreateType } from "../../../../../common/types";

// Not a standard event page so don't extend EventPage
export class ReviewRARequest2Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Review RA Request",
  });
  private readonly updateFlagCommentsHint: Locator = this.page.getByText(
    "Update the comments describing the user's support needs or flag description. Do not include any sensitive information such as personal details.",
  );
  private readonly warningText: Locator = this.page.getByText(
    "The details entered here MAY be visible to the party in the future.",
  );
  private readonly charLimitHint: Locator = this.page.getByText(
    "You can enter up to 200 characters",
  );
  private readonly statusList: string[] = [
    "Requested",
    "Active",
    "Inactive",
    "Not approved",
  ];
  private readonly updateFlagStatusHint: Locator = this.page.getByText(
    "Describe reason for status change.",
  );
  private readonly iNeedTranslationLabel: Locator = this.page.getByText(
    "I need to add a translation",
  );
  private readonly changeReasonTextbox: Locator = this.page.locator(
    "#flagStatusReasonChange",
  );

  private pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(
    adjustment: string,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(
      this.page.getByRole("heading", {
        name: `Update flag "${adjustment}"`,
        exact: true,
      }),
    ).toBeVisible();
    await expect(this.updateFlagCommentsHint).toBeVisible();
    await expect(this.warningText).toBeVisible();
    await expect(this.charLimitHint).toHaveCount(2);
    // flag status heading
    await expect(
      this.page.getByRole("heading", {
        name: `Update flag "${adjustment}" status`,
      }),
    ).toBeVisible();
    await this.pageUtils.assertStrings(
      this.statusList,
      this.page.locator("label"),
    );
    await expect(this.updateFlagStatusHint).toBeVisible();
    await expect(this.iNeedTranslationLabel).toBeVisible();
    // not sure why the buttons are different for the different case types
    if (caseType === "C100") {
      await expect(this.submitButton).toBeVisible();
    } else {
      await expect(this.continueButton).toBeVisible();
    }
    await expect(this.previousButton).toBeVisible();
  }

  async updateFlagStatus(newStatus: string): Promise<void> {
    await this.page
      .getByRole("radio", { name: newStatus, exact: true })
      .check();
  }

  async addReasonForChange(changeReason: string): Promise<void> {
    await this.changeReasonTextbox.fill(changeReason);
  }
}
