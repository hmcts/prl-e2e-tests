import { expect, Locator, Page } from "@playwright/test";
import { CcdCaseHeaderComponent } from "../../../components/exui/ccdCaseHeader.component.js";
import { Base } from "../../base.po.js";
import { AlertBannerComponent } from "../../../components/exui/alertBanner.component.js";
import {
  amendEvents,
  c100SolicitorEvents,
  courtAdminEvents,
  fl401CaseWorkerActions,
  fl401JudiciaryEvents,
  fl401SolicitorEvents,
  fl401SubmittedSolicitorEvents,
  WACaseWorkerActions,
} from "../../../../common/types.js";
import { MatTabHeaderComponent } from "../../../components/exui/matTabHeader.component.js";

export abstract class CaseAccessViewPage extends Base {
  readonly caseHeader: CcdCaseHeaderComponent = new CcdCaseHeaderComponent(
    this.page,
  );
  readonly alertBanner: AlertBannerComponent = new AlertBannerComponent(
    this.page,
  );
  readonly tabHeader: MatTabHeaderComponent = new MatTabHeaderComponent(
    this.page,
  );
  readonly goButton: Locator = this.page.getByRole("button", { name: "Go" });

  protected constructor(page: Page) {
    super(page);
  }

  abstract goToPage(): Promise<void>;

  async chooseEventFromDropdown(
    chosenEvent:
      | c100SolicitorEvents
      | fl401SolicitorEvents
      | fl401SubmittedSolicitorEvents
      | fl401JudiciaryEvents
      | WACaseWorkerActions
      | fl401CaseWorkerActions
      | courtAdminEvents
      | amendEvents,
  ) {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page.locator("#next-step")).toBeVisible();

    await this.page.selectOption("#next-step", chosenEvent);

    await expect(this.goButton).toBeEnabled();

    await expect
      .poll(
        async () => {
          const goButtonStillVisible = await this.goButton.isVisible();
          if (goButtonStillVisible) {
            await this.goButton.click();
          }
          return goButtonStillVisible;
        },
        {
          // Retry every 15 seconds
          intervals: [15_000],
          // Timeout after 5 minutes
          timeout: 300_000,
        },
      )
      .toBeFalsy();
  }
}
