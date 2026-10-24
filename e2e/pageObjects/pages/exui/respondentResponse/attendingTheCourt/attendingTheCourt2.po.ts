import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseEventPage } from "../respondentResponseEventPage.po.js";

// Respondent solicitor C7 response - "Attending the court", Domestic Abuse Act 2021 information
// (c100ResSolAttendingTheCourtA2). The page is static text, so it is compared with a snapshot.
export class AttendingTheCourt2Page extends RespondentResponseEventPage {
  // the page's own content, without the case number headings that change for every case
  private readonly pageContent: Locator = this.page.locator("#caseEditForm");

  constructor(page: Page) {
    super(page, "Attending the court");
  }

  async assertPageContents(
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void> {
    await expect(this.page).toHaveURL(/\/c100ResSolAttendingTheCourtA2$/);
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        level: 3,
        name: "Domestic Abuse Act 2021",
        exact: true,
      }),
    ).toBeVisible();
    await expect(this.pageContent).toHaveScreenshot(
      [...snapshotPath, `${snapshotName}.png`],
      { maxDiffPixelRatio: 0.02 },
    );
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }
}
