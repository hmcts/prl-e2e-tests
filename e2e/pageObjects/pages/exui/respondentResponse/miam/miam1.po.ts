import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseEventPage } from "../respondentResponseEventPage.po.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

/** Answers for the MIAM event; the willing/reason answers only apply when not attended. */
export interface MiamParams {
  hasAttendedMiam: boolean;
  willingToAttendMiam?: boolean;
  reasonNotWilling?: string;
}

export class Miam1Page extends RespondentResponseEventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly labels: string[] = [
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    "What is a Mediation Information and Assessment Meeting (MIAM)?",
  ];

  private readonly attendedMiam: Locator = this.page.getByRole("group", {
    name: "Has the respondent attended a Mediation Information and Assessment Meeting (MIAM)?",
    exact: true,
  });
  private readonly attendedMiamYes: Locator = this.attendedMiam.getByRole(
    "radio",
    { name: "Yes", exact: true },
  );
  private readonly attendedMiamNo: Locator = this.attendedMiam.getByRole(
    "radio",
    { name: "No", exact: true },
  );

  constructor(page: Page) {
    super(page, "MIAM");
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/c100ResSolMiamA1$/);
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        level: 3,
        name: `Respondent name: ${respondentName}`,
      }),
    ).toBeVisible();
    await this.pageUtils.assertStrings(this.labels);
    await expect(this.attendedMiam).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(hasAttendedMiam: boolean): Promise<void> {
    await (
      hasAttendedMiam ? this.attendedMiamYes : this.attendedMiamNo
    ).check();
  }
}
