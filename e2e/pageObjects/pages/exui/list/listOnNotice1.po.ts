import { EventPage } from "../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";

export class ListOnNotice1Page extends EventPage {
  private readonly listOnNoticeReasons = this.page.locator(
    "#selectedReasonsForListOnNotice",
  );
  private readonly reasonsForListOnNoticeOptions: string[] = [
    "Provide reasons why the without notice application should be heard on notice (Optional)",
    "The Local Authority are currently involved with the child[ren] and family",
    "There is no evidence of immediate risk of harm to the child[ren]",
    "Information from both parties and safeguarding is necessary to enable the court to determine the long-term arrangements.",
    "The child[ren] reside with applicant and both are protected by a Non-Molestation Order",
    "There is no evidence to suggest that the respondent seeks to remove the child[ren] from the applicant's care and therefore there is no genuine emergency",
    "There is no evidence to suggest that the respondent would seek to frustrate the process if they were given notice",
    "It is not without notice but it is urgent",
  ];

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "List on notice");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await this.pageUtils.assertStrings(
      this.reasonsForListOnNoticeOptions,
      this.listOnNoticeReasons,
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async checkReason(reason: string) {
    await this.page
      .locator(`#selectedReasonsForListOnNotice-${reason}`)
      .check();
  }
}
