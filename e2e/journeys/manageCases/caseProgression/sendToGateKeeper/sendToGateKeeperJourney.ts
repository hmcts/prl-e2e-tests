import {
  SendToGateKeeper1Page,
  SendToGateKeeperParams,
} from "../../../../pageObjects/pages/exui/sendToGateKeeper/sendToGateKeeper1.po.js";
import { TasksPage } from "../../../../pageObjects/pages/exui/caseView/tasks.po.js";
import { Page } from "@playwright/test";
import { SendToGateKeeperSubmitPage } from "../../../../pageObjects/pages/exui/sendToGateKeeper/sendToGateKeeperSubmit.po.js";
import { SummaryPage } from "../../../../pageObjects/pages/exui/caseView/summary.po.js";
import { RolesAndAccessPage } from "../../../../pageObjects/pages/exui/caseView/rolesAndAccess.po.js";
import { UserRole } from "../../../../common/types.js";

export interface SendToGateKeeperJourneyParams {
  sendToGateKeeperParams: SendToGateKeeperParams;
  snapshotPath: string[];
  snapshotName: string;
}

// class to handle send to gatekeeper journeys - required because this journey is large and re-used
export class SendToGateKeeperJourney {
  async sendToGateKeeper(
    page: Page,
    caseNumber: string,
    userRole: UserRole,
    params: SendToGateKeeperJourneyParams,
  ): Promise<void> {
    const tasksPage: TasksPage = new TasksPage(page);
    await tasksPage.assignTaskToMeAndTriggerNextSteps(
      "Send to Gatekeeper",
      "Send to Gatekeeper",
      userRole,
    );

    const sendToGateKeeper1Page: SendToGateKeeper1Page =
      new SendToGateKeeper1Page(page);
    await sendToGateKeeper1Page.assertPageContents();
    await sendToGateKeeper1Page.verifyAccessibility();
    await sendToGateKeeper1Page.fillInFields(params.sendToGateKeeperParams);
    await sendToGateKeeper1Page.clickContinue();

    const sendToGateKeeperSubmitPage: SendToGateKeeperSubmitPage =
      new SendToGateKeeperSubmitPage(page);
    console.log("Initial snapshot path: " + params.snapshotPath);
    await sendToGateKeeperSubmitPage.assertPageContents(
      params.snapshotPath,
      params.snapshotName,
    );
    await sendToGateKeeperSubmitPage.verifyAccessibility();
    await sendToGateKeeperSubmitPage.clickSubmit();

    const summaryPage: SummaryPage = new SummaryPage(page);
    await summaryPage.alertBanner.assertEventAlert(
      caseNumber,
      "Send to gatekeeper",
    );
    await summaryPage.assertCaseStatus("Gatekeeping");
    if (params.sendToGateKeeperParams.sendToSpecificGateKeeper) {
      await this.assertGateKeeperRolesAndAccess(
        page,
        params.sendToGateKeeperParams,
      );
    }
  }

  private async assertGateKeeperRolesAndAccess(
    page: Page,
    params: Partial<SendToGateKeeperParams>,
  ): Promise<void> {
    const rolesAndAccessPage: RolesAndAccessPage = new RolesAndAccessPage(page);
    await rolesAndAccessPage.goToPage();
    if (params.judgeOrLegalAdviser === "Judge") {
      await rolesAndAccessPage.assertRolesAndAccessSection(
        "Judiciary",
        params.judgeName,
        "Gatekeeping Judge",
      );
    } else {
      await rolesAndAccessPage.assertRolesAndAccessSection(
        "Legal Ops",
        params.legalAdviserDisplayName,
        "Allocated Legal Adviser",
      );
    }
  }
}
