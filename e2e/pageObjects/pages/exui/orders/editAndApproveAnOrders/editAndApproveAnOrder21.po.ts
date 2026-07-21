import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";

export class EditAndApproveAnOrder21Page extends EventPage {

  //directionsText = "Test directions to admin",

  private readonly formLabel: Locator = this.page.locator(Selectors.GovukFormLabel, {
    hasText: "Directions to admin: (Optional)",
  });

  private readonly formHint: Locator = this.page.locator(Selectors.GovukFormHint, {
    hasText: "Give any further directions, for example if there are listing requirements or special measures needed.",
  });




  constructor(page: Page) {
    super(page, "Edit and approve a draft order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.formLabel).toBeVisible();
    await expect(this.formHint).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderCheckOptions(judeOrderAction: string,): Promise<void> {
    await this.page.getByRole("radio", { name: judeOrderAction }).check();
  }
}