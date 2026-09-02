import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";

export interface ManageOrderUrgentParams {
  isUrgent: boolean;
}

export class ManageOrderUrgentPage extends EventPage {
  readonly urgentYesRadio: Locator = this.page.locator(
    "#checkIsThisUrgent_Yes",
  );
  readonly urgentNoRadio: Locator = this.page.locator("#checkIsThisUrgent_No");

  private readonly formLabels: string[] = [
    "Does this need to be actioned today?",
    "Yes",
    "No",
  ];

  private readonly hintText =
    "Only select Yes if this work needs to be actioned today. Selecting Yes will generate an urgent work allocation task for the recipient.";

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await this.pageUtils.assertStrings(this.formLabels);
    await expect(this.page.getByText(this.hintText)).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectIsUrgent(isUrgent: boolean): Promise<void> {
    if (isUrgent) {
      await this.urgentYesRadio.check();
    } else {
      await this.urgentNoRadio.check();
    }
  }

  async selectUrgentOption({ isUrgent }: ManageOrderUrgentParams): Promise<void> {
    await this.selectIsUrgent(isUrgent);
  }
}
