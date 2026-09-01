import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { Base } from "../../base.po.ts";

export class HearingSummaryPage extends Base {
  private readonly sectionHeadings: string[] = [
    "Hearing requirements",
    "Additional facilities",
    "Stage",
    "Participant attendance",
    "Hearing venue",
    "Language requirements",
    "Judge details",
    "Length, date and priority level of hearing",
    "Linked hearings",
    "Additional instructions",
  ];
  private readonly summaryKeys: string[] = [
    "Case name",
    "Case reference",
    "Type",
    "Reasonable adjustments",
    "Will additional security be required?",
    "Select any additional facilities required",
    "What stage is this hearing at?",
    "Will this be a paper hearing?",
    "What will be the methods of attendance for this hearing?",
    "How will each participant attend the hearing?",
    "How many people will attend the hearing in person?",
    "What are the hearing venue details?",
    "Does this hearing need to be in Welsh?",
    "Do you want a specific judge?",
    "Select all judge types that apply",
    "Length of hearing",
    "Does the hearing need to take place on a specific date?",
    "What is the priority of this hearing?",
    "Will this hearing need to be linked to other hearings?",
    "Enter any additional instructions for the hearing",
  ];
  readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Check your answers before sending your request",
    exact: true,
  });
  readonly headings: Locator = this.page.locator(Selectors.GovukHeadingM);
  readonly keys: Locator = this.page.locator(Selectors.GovukSummaryListKey);
  readonly submitRequestButton: Locator = this.page.getByRole("button", {
    name: "Submit request",
    exact: true,
  });
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await this.pageUtils.assertStrings(this.sectionHeadings, this.headings);
    await this.pageUtils.assertStrings(this.summaryKeys, this.keys);
    await expect(this.submitRequestButton).toBeVisible();
  }

  async submitRequest(): Promise<void> {
    await this.submitRequestButton.click();
  }
}
