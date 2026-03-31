import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";
import {
  HearingDetailsParams,
  OrderHearingDetailsComponent,
} from "../../../../components/exui/orders/orderHearingDetails.component.js";

export interface ManageOrder19Params {
  isDateReservedWithListAssist: boolean;
  hearingDetails?: HearingDetailsParams;
}

export class ManageOrder19Page extends EventPage {
  private readonly optionalHearingHeading = this.page.getByRole("heading", {
    name: "Creating a hearing is optional",
  });
  private readonly optionalHearingDescription = this.page.getByText(
    "You can create multiple hearings",
  );
  private readonly dateReservedListAssistRadio: Locator = this.page.getByRole(
    "radio",
    {
      name: "The date is reserved with List Assist",
    },
  );
  private readonly dateReservedListAssistStrong: Locator = this.page.locator(
    Selectors.strong,
    {
      hasText: "The date is reserved with List Assist",
    },
  );

  private readonly hearingDetails: OrderHearingDetailsComponent =
    new OrderHearingDetailsComponent(this.page);

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.optionalHearingHeading).toBeVisible();
    await expect(this.optionalHearingDescription).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillHearingDetails({
    isDateReservedWithListAssist,
    hearingDetails,
  }: ManageOrder19Params): Promise<void> {
    if (isDateReservedWithListAssist) {
      await this.dateReservedListAssistRadio.check();
      await expect(this.dateReservedListAssistStrong).toBeVisible();
      await this.hearingDetails.assertHearingDetailsContentsForOrderPages(
        "manageOrder",
      );
      await this.hearingDetails.fillInHearingDetails(hearingDetails);
    }
  }
}
