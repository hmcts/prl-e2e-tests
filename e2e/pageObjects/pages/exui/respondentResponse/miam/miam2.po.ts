import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseEventPage } from "../respondentResponseEventPage.po.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export class Miam2Page extends RespondentResponseEventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly labels: string[] = [
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    "Help with MIAM costs and exemptions",
  ];

  private readonly willingToAttend: Locator = this.page.getByRole("group", {
    name: "Would they be willing to attend a MIAM?",
    exact: true,
  });
  private readonly willingToAttendYes: Locator = this.willingToAttend.getByRole(
    "radio",
    { name: "Yes", exact: true },
  );
  private readonly willingToAttendNo: Locator = this.willingToAttend.getByRole(
    "radio",
    { name: "No", exact: true },
  );
  private readonly explainWhy: Locator = this.page.getByRole("textbox", {
    name: "Explain why",
    exact: true,
  });

  constructor(page: Page) {
    super(page, "MIAM");
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/c100ResSolMiamA2$/);
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        level: 3,
        name: `Respondent name: ${respondentName}`,
      }),
    ).toBeVisible();
    await this.pageUtils.assertStrings(this.labels);
    await expect(this.willingToAttend).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(
    willingToAttendMiam: boolean,
    reasonNotWilling?: string,
  ): Promise<void> {
    await (
      willingToAttendMiam ? this.willingToAttendYes : this.willingToAttendNo
    ).check();
    if (!willingToAttendMiam) {
      await expect(
        this.explainWhy,
        '"Explain why" should appear once "No" is selected',
      ).toBeVisible();
      await this.explainWhy.fill(reasonNotWilling ?? "");
    }
  }
}
