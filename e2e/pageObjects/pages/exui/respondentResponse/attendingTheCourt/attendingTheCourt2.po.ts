import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseEventPage } from "../respondentResponseEventPage.po.js";

export class AttendingTheCourt2Page extends RespondentResponseEventPage {
  private readonly domesticAbuseActHeading: Locator = this.page.getByRole(
    "heading",
    { level: 3, name: "Domestic Abuse Act 2021", exact: true },
  );
  private readonly domesticAbuseParagraph1: Locator = this.page.getByText(
    "Provisions in the Domestic Abuse Act 2021 have the effect of preventing an individual accused of abuse from questioning in person a party or witness in the case who is the victim of the abuse, and also prevents a victim of abuse from questioning in person the accused individual in specified circumstances.",
    { exact: true },
  );
  private readonly domesticAbuseParagraph2: Locator = this.page.getByText(
    "If the court directs that the proceedings be listed for a hearing where oral evidence may be given, form EX740 (person making the abuse accusation) or form EX741 (person accused of abuse) ‘Application and information needed by the court to consider whether to prevent (prohibit) questioning (cross-examination) in person’ may need to be completed so that the court can consider whether questioning in person should be prevented. The court will send the appropriate form with the court order.",
    { exact: true },
  );

  constructor(page: Page) {
    super(page, "Attending the court");
  }

  async assertPageContents(): Promise<void> {
    await expect(this.page).toHaveURL(/\/c100ResSolAttendingTheCourtA2$/);
    await this.assertPageHeadings();
    await expect(this.domesticAbuseActHeading).toBeVisible();
    await expect(this.domesticAbuseParagraph1).toBeVisible();
    await expect(this.domesticAbuseParagraph2).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }
}
