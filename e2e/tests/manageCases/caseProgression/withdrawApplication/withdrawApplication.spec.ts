import config from "../../../../utils/config.utils";
import { test } from "../../../fixtures";

test.describe("Withdraw C100 (Solicitor created) application event as a solicitor", () => {
  let caseRef: string;
  test.beforeEach(async ({ browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createCACase(browser);
  });
  [
    {
      withdrawApplication: true,
      snapshotName: "withdraw-application-yes",
      caseStatus: "Withdrawn",
    },
    {
      withdrawApplication: false,
      snapshotName: "withdraw-application-no",
      caseStatus: "Submitted",
    },
  ].forEach(({ withdrawApplication, snapshotName, caseStatus }) => {
    test(`Complete withdraw application event by withdrawing application: ${withdrawApplication}. @nightly @accessibility @regression`, async ({
      solicitor,
      navigationUtils,
    }): Promise<void> => {
      const { page, summaryPage, withdrawApplicationEvent } = solicitor;

      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
      await summaryPage.chooseEventFromDropdown("Withdraw application");

      await withdrawApplicationEvent.page1.assertPageContents();
      await withdrawApplicationEvent.page1.verifyAccessibility();
      await withdrawApplicationEvent.page1.selectWithdrawApplication(
        withdrawApplication,
      );
      await withdrawApplicationEvent.page1.clickContinue();

      await withdrawApplicationEvent.submitPage.assertPageContents(
        ["caseProgression", "withdrawApplication"],
        snapshotName,
      );
      await withdrawApplicationEvent.submitPage.verifyAccessibility();
      await withdrawApplicationEvent.submitPage.clickSaveAndContinue();

      await withdrawApplicationEvent.confirmPage.assertPageContents(
        withdrawApplication,
      );
      await withdrawApplicationEvent.confirmPage.verifyAccessibility();
      await withdrawApplicationEvent.confirmPage.clickCloseAndReturnToCaseDetails();

      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Withdraw application",
      );
      await summaryPage.assertCaseStatus(caseStatus);
    });
  });
});
