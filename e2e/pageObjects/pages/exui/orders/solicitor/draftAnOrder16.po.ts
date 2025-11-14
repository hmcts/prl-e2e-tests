import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderTypes } from "../../../../../common/types.js";
import {
  HearingDetailsParams,
  OrderHearingDetailsComponent,
} from "../../../../components/exui/orderHearingDetails.component.js";

interface DraftAnOrderParams {
  hasJudgeProvidedHearingDetails: boolean;
  hearingDetails?: HearingDetailsParams;
}

export class DraftAnOrder16Page extends EventPage {
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly judgeProvidedHearingDetailsLabel: Locator =
    this.page.locator(Selectors.GovukFormLabel, {
      hasText: "Has the judge provided you with the hearing details?",
    });
  private readonly optionalHearingHeading = this.page.locator(Selectors.h3, {
    hasText: "Creating a hearing is optional",
  });
  private readonly optionalHearingDescription = this.page.locator(Selectors.p, {
    hasText: "You can create multiple hearings",
  });
  private readonly hearingDetails: OrderHearingDetailsComponent =
    new OrderHearingDetailsComponent(this.page, "Hearing");

  constructor(page: Page) {
    super(page, "Draft an order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.headingH3, { hasText: orderType }),
    ).toBeVisible();
    await expect(this.judgeProvidedHearingDetailsLabel).toBeVisible();
    await this.checkStrings(
      `#hasJudgeProvidedHearingDetails ${Selectors.GovukFormLabel}`,
      this.yesAndNoLabels,
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields({
    hasJudgeProvidedHearingDetails,
    hearingDetails,
  }: DraftAnOrderParams): Promise<void> {
    await this.page
      .locator("#hasJudgeProvidedHearingDetails")
      .getByRole("radio", {
        name: hasJudgeProvidedHearingDetails ? "Yes" : "No",
      })
      .check();
    if (hasJudgeProvidedHearingDetails) {
      await this.hearingDetails.assertHearingDetailsContents();
      await this.hearingDetails.fillInHearingDetails(hearingDetails);
    }
  }
}
