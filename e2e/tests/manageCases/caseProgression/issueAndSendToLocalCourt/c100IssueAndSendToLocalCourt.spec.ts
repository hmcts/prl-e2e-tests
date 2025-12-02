import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures/fixtures.ts";

test.describe("Issue and send to local court for CA cases", () => {
  let caseNumber: string = "";

  test.beforeEach(
    async ({ courtAdminStoke, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createCACase(browser);
      await navigationUtils.goToCase(
        courtAdminStoke.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  [
    {
      courtName:
        "Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP",
      snapshotName: "issueAndSendToLocalCourt",
    },
  ].forEach(({ courtName, snapshotName }) => {
    test(`Issue and send CA(C100) submitted case to local court as a CTSC user or CTSC admin with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility @regression`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      const {
        tasksPage,
        issueAndSendToLocalCourtCallback1Page,
        issueAndSendToLocalCourtCallbackSubmitPage,
        summaryPage,
      } = courtAdminStoke;

      await tasksPage.assignTaskToMeAndTriggerNextSteps(
        "Check Application",
        "Issue and send to local Court",
      );

      await issueAndSendToLocalCourtCallback1Page.assertPageContents();

      // #TODO Disabled pending FPET-1194 ticket
      //await issueAndSendToLocalCourtCallback1Page.verifyAccessibility();

      await issueAndSendToLocalCourtCallback1Page.selectCourt(courtName);
      await issueAndSendToLocalCourtCallback1Page.clickContinue();

      await issueAndSendToLocalCourtCallbackSubmitPage.assertPageContents(
        ["caseProgression", "issueAndSendToLocalCourt"],
        snapshotName,
      );
      await issueAndSendToLocalCourtCallbackSubmitPage.verifyAccessibility();
      await issueAndSendToLocalCourtCallbackSubmitPage.clickSubmit();

      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Issue and send to local Court",
      );
      await summaryPage.assertCaseStatus("Case Issued");
    });
  });
});
