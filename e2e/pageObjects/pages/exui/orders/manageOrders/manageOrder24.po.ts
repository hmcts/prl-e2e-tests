import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";

export interface ManageOrder24Params {
  checkOption: string;
  judgeOrLegalAdviser: string;
  judgeName: string;
}
const baseCheckSelector = "#amendOrderSelectCheckOptions-";
const judgeOrLAbaseCheckSelector = "#amendOrderSelectJudgeOrLa-";

export class ManageOrder24Page extends EventPage {
  private readonly checkOptionsFormLabels: string[] = [
    "Does someone need to check the order?",
    "A judge or legal adviser needs to check the order",
    "A manager needs to check the order",
    "No checks are required",
  ];

  private readonly judgeOrLAOptionsLabel = this.page.getByText(
    "Select judge or legal advisor",
  );
  private readonly judgeNameLabel = this.page.getByText("Name of judge");
  private readonly LANameLabel = this.page.getByText("Name of legal adviser");

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();

    await this.pageUtils.assertStrings(this.checkOptionsFormLabels);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectCheckOrder({
    checkOption,
    judgeOrLegalAdviser,
    judgeName,
  }: ManageOrder24Params): Promise<void> {
    await this.page.click(`${baseCheckSelector}${checkOption}`);
    await expect(this.judgeOrLAOptionsLabel).toBeVisible();
    await this.page.click(
      `${judgeOrLAbaseCheckSelector}${judgeOrLegalAdviser}`,
    );
    await expect(this.judgeNameLabel).toBeVisible();
    await this.page
      .getByRole("combobox", { name: "Name of judge" })
      .fill(judgeName);
    // Wait for the judge option in the dropdown to become visible using dynamic content
    const judgeNameDropdownOption = this.page.locator(".mat-option-text", {
      hasText: judgeName,
    });
    await expect(judgeNameDropdownOption).toBeVisible();
    // Click the option containing the judge name (dynamic value)
    await judgeNameDropdownOption.click();
  }
}
