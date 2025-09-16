import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import {
  c100SolicitorEvents,
  fl401SolicitorEvents,
  fl401SubmittedSolicitorEvents,
  fl401JudiciaryEvents,
  WACaseWorkerActions,
  fl401CaseWorkerActions,
  courtAdminEvents,
  amendEvents,
} from "../../../../common/types.ts";

export class SummaryPage extends CaseAccessViewPage {
  readonly goButton: Locator = this.page.getByRole("button", { name: "Go" });

  constructor(page: Page) {
    super(page);
  }

  public async chooseEventFromDropdown(
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