import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { PageUtils } from "../../../../utils/page.utils.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingStagePage extends HearingRequestPage {
  private readonly stageLabels: string[] = [
    "Allocation",
    "Appeal",
    "Application",
    "Breach",
    "Case Management Conference",
    "Case Management Hearing",
    "Committal",
    "Conciliation",
    "Costs",
    "Directions (First/Further)",
    "Dispute Resolution Appointment",
    "Finding of Fact",
    "First Hearing",
    "Full/Final hearing",
    "Further Case Management Hearing",
    "2nd Gatekeeping Appointment",
    "Ground Rules Hearing",
    "Human Rights Act Application",
    "Judgment",
    "Neutral Evaluation Hearing",
    "Permission Hearing",
    "Pre Hearing Review",
    "Review",
    "Safeguarding Gatekeeping Appointment",
    "Settlement Conference",
    "First Hearing Dispute Resolution Appointment (FHDRA)",
  ];
  readonly stageOptions: Locator = this.page.locator(Selectors.GovukLabel);
  readonly allocationOption: Locator = this.page.locator("#ABA5-ALL");
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "What stage is this hearing at?");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await this.pageUtils.assertStrings(this.stageLabels, this.stageOptions);
    await expect(this.allocationOption).toBeVisible();
  }

  async fillInFields(): Promise<void> {
    await this.allocationOption.check();
  }
}
