import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderTypes } from "../../../../../common/types.js";

export class EditAndApproveAnOrder21Page extends EventPage {
  private readonly adminFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Directions to admin: (Optional)",
    },
  );

  private readonly applicationServeFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Once this order is complete, can the application be served?",
    },
  );
  private readonly formHint: Locator = this.page.locator(
    Selectors.GovukFormHint,
    {
      hasText:
        "Give any further directions, for example if there are listing requirements or special measures needed.",
    },
  );
  private readonly adminDirectionTextArea: Locator = this.page.locator(
    "#judgeDirectionsToAdmin",
  );

  constructor(page: Page) {
    super(page, "Edit and approve a draft order");
  }

  async assertPageContents(
    orderType: OrderTypes,
    ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType, { exact: true })).toBeVisible();
    await expect(this.adminFormLabel).toBeVisible();
    await expect(this.formHint).toBeVisible();
    await expect(this.applicationServeFormLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(serveApplication: boolean): Promise<void> {
    await this.adminDirectionTextArea.fill("Test directions to admin");
    await this.page
      .getByRole("group", { name: "Once this order is complete, can the application be served?" })
      .getByLabel(serveApplication ? "Yes" : "No")
      .check();
  }
}