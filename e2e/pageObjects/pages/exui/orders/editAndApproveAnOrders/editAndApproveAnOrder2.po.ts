import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { PreviewOrdersComponent } from "../../../../components/exui/orders/previewOrders.component.js";
import { OrderTypes } from "../../../../../common/types.js";

export class EditAndApproveAnOrder2Page extends EventPage {
  private readonly previewOrderComponent: PreviewOrdersComponent =
    new PreviewOrdersComponent(this.page);
  private readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Check the order",
  });
  private readonly heading3: Locator = this.page.locator(Selectors.h3, {
    hasText: "Open the order and review the content",
  });
  private readonly orderLabel: Locator = this.page.locator(
    "#whatToDoWithOrderSolicitor",
    {
      hasText: "What do you want to do with this order?",
    },
  );
  private readonly sendToAdminLabel: Locator = this.page.locator(
    "#whatToDoWithOrderSolicitor-sendToAdminToServe",
  );
  private readonly giveAdminDirLabel: Locator = this.page.locator(
    "#whatToDoWithOrderSolicitor-giveAdminFurtherDirectionsAndServe",
  );
  private readonly editAndGiveAdminLabel: Locator = this.page.locator(
    "#whatToDoWithOrderSolicitor-editTheOrderAndServe",
  );
  private readonly askTheLegalLabel: Locator = this.page.locator(
    "#whatToDoWithOrderSolicitor-askLegalRepToMakeChanges",
  );
  private readonly giveInstructionsFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Give instructions to the legal representative",
    },
  );
  private readonly giveInstructionsToTheLegalRepresentativeTextbox: Locator =
    this.page.locator("#instructionsToLegalRepresentative");

  constructor(page: Page) {
    super(page, "Edit and approve a draft order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("button", {
        name: this.previewOrderComponent.getOrderNameFromOrderType(
          orderType,
          true,
        ),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", {
        name: this.previewOrderComponent.getOrderNameFromOrderType(
          orderType,
          false,
        ),
        exact: true,
      }),
    ).toBeVisible();
    await expect(this.heading2).toBeVisible();
    await expect(this.heading3).toBeVisible();
    await expect(this.orderLabel).toBeVisible();
    await expect(this.sendToAdminLabel).toBeVisible();
    await expect(this.giveAdminDirLabel).toBeVisible();
    await expect(this.editAndGiveAdminLabel).toBeVisible();
    await expect(this.askTheLegalLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderCheckOptions(judeOrderAction: string): Promise<void> {
    await this.page
      .getByRole("radio", { name: judeOrderAction, exact: true })
      .check();
    if (judeOrderAction == "Ask the legal representative to make changes") {
      await expect(this.giveInstructionsFormLabel).toBeVisible();
      await this.giveInstructionsToTheLegalRepresentativeTextbox.fill(
        "Test instructions",
      );
    }
  }
}
