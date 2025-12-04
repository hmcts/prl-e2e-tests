import { test } from "../../../fixtures.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";
import {
  SendToGateKeeper1Page,
  SendToGateKeeperParams,
} from "../../../../pageObjects/pages/exui/sendToGateKeeper/sendToGateKeeper1.po.js";
import { TasksPage } from "../../../../pageObjects/pages/exui/caseView/tasks.po.js";
import { SendToGateKeeperSubmitPage } from "../../../../pageObjects/pages/exui/sendToGateKeeper/sendToGateKeeperSubmit.po.js";
import { SummaryPage } from "../../../../pageObjects/pages/exui/caseView/summary.po.js";
import { RolesAndAccessPage } from "../../../../pageObjects/pages/exui/caseView/rolesAndAccess.po.js";
import { UserRole } from "../../../../common/types.js";
export interface SendToGateKeeperJourneyParams {
  sendToGateKeeperParams: SendToGateKeeperParams;
  snapshotPath: string[];
  snapshotName: string;
}

// Class to handle send to gatekeeper journey
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

test.use({ storageState: config.sessionStoragePath + "judge.json" });

test.describe("Complete the Restricted Case Access events for DA case.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - roles and access doesn't work",
  );

  let ccdRef: string = "";

  test.beforeEach(async ({ browser, caseEventUtils }) => {
    // create a DA case (court nav) and complete 'complete application' and 'send to gatekeeper' events
    ccdRef = await caseEventUtils.createDACase(browser);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );

    const sendToGatekeeperJourney: SendToGateKeeperJourney =
      new SendToGateKeeperJourney();

    await sendToGatekeeperJourney.sendToGateKeeper(
      caPage,
      ccdRef,
      "caseWorker",
      {
        sendToGateKeeperParams: {
          sendToSpecificGateKeeper: true,
          judgeOrLegalAdviser: "Judge",
          judgeName: "Ms Elizabeth Williams",
        },
        snapshotPath: ["caseProgression", "sendToGateKeeper"],
        snapshotName: "send-to-judiciary-gatekeeper",
      },
    );
  });

  test("Mark DA case as restricted as a gatekeeper judge. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await RestrictedCaseAccess.restrictedCaseAccess({
      page: page,
      accessibilityTest: true,
      ccdRef,
    });
  });
});
