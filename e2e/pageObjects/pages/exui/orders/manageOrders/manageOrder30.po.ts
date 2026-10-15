import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { Selectors } from "../../../../../common/selectors.js";

export interface ManageOrder30Params {
  serveApplication: boolean;
}

export class ManageOrder30Page extends EventPage {
  private readonly adminDirectionLabel: Locator = this.page.getByText(
    "Directions to admin: (Optional)",
  );
  private readonly directionHint: Locator = this.page.getByText(
    "Give any further directions, for example if there are listing requirements or special measures needed.",
  );
  private readonly adminDirectionsTextArea: Locator = this.page.locator(
    "#judgeDirectionsToAdmin",
  );
  private readonly applicationServeText: Locator = this.page.getByText(
    "Once this order is complete, can the application be served?",
  );
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.adminDirectionLabel).toBeVisible();
    await expect(this.directionHint).toBeVisible();
    await expect(this.applicationServeText).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(`#isOrderCompleteToServe ${Selectors.GovukFormLabel}`),
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillAdminDirectionDetails(serveApplication: boolean): Promise<void> {
    await this.adminDirectionsTextArea.fill("Test");
    await this.page
      .getByRole("group", {
        name: "Once this order is complete, can the application be served?",
      })
      .getByLabel(serveApplication ? "Yes" : "No")
      .check();
  }
}
