import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { OrderTypes } from "../../../../common/types.js";
import { OrderHearingDetailsComponent, HearingDetailsParams } from "../../../components/exui/orders/orderHearingDetails.component.ts";
import { PageUtils } from "../../../../utils/page.utils.js";

export interface EditReturnedOrder12PageParams {
  hasJudgeProvidedHearingDetails: boolean;
  hearingDetails?: HearingDetailsParams;
  orderJourneyType: string,
}

export class EditReturnedOrder12Page extends EventPage {
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly judgeProvidedHearingDetailsLabel: Locator =
    this.page.getByText("Has the judge provided you with the hearing details?");
  private readonly optionalHearingHeading = this.page.getByRole("heading", {
    name: "Creating a hearing is optional",
  });
  private readonly optionalHearingDescription = this.page.getByText(
    "You can create multiple hearings",
  );
  private readonly hearingDetails: OrderHearingDetailsComponent =
    new OrderHearingDetailsComponent(this.page);
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.judgeProvidedHearingDetailsLabel).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(
        `#hasJudgeProvidedHearingDetails ${Selectors.GovukFormLabel}`,
      ),
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields({
    hasJudgeProvidedHearingDetails,
    hearingDetails,
    orderJourneyType,
  }: EditReturnedOrder12PageParams): Promise<void> {
    await this.page
      .getByRole("group", { name: "Has the judge provided you" })
      .getByLabel(hasJudgeProvidedHearingDetails ? "Yes" : "No")
      .check();
    if (hasJudgeProvidedHearingDetails) {
      await expect(this.optionalHearingHeading).toBeVisible();
      await expect(this.optionalHearingDescription).toBeVisible();
      await this.hearingDetails.assertHearingDetailsContentsForOrderPages(orderJourneyType);
      await this.hearingDetails.fillInHearingDetails(hearingDetails);
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
