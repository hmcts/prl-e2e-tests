import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { OrderTypes } from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";

export interface ManageOrder12Params {
  loremIpsum: string;
  riskInvolved: boolean;
  date1: string;
}

export class PowerOfArrestManageOrders12Page extends EventPage {
  private readonly paraText = this.page.getByText(
    "Paragraphs of the order to which the power of arrest applies",
  );
  private readonly radioLabelText = this.page.getByText(
    "Is there risk of significant harm to the applicant or children if ther power of arrest is not attached immediately?",
    {
      exact: true,
    },
  );
  private readonly dateText = this.page.getByText("Date order ends");
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];

  private readonly paraInput = this.page.locator(
    "#fl404CustomFields_fl404bPowerOfArrestParagraph",
  );
  private readonly inputSpecificDate = this.page.locator(
    ".datepicker-container > .mat-datepicker-input:visible",
  );

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType).first()).toBeVisible();
    await expect(this.paraText).toBeVisible();
    await expect(this.radioLabelText).toBeVisible();
    await expect(this.dateText).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(
        `#fl404CustomFields_fl404bRiskOfSignificantHarm ${Selectors.GovukFormLabel}`,
      ),
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillOrderDetails(params: ManageOrder12Params): Promise<void> {
    await this.paraInput.fill(params.loremIpsum);
    await this.page
      .getByRole("group", {
        name: "Is there risk of significant harm to the applicant or children if ther power of arrest is not attached immediately?",
      })
      .getByLabel(params.riskInvolved ? "Yes" : "No")
      .check();
    await this.inputSpecificDate.fill(params.date1);
  }
}
