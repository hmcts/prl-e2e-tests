import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures/fixtures.ts";

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
      const {
        page,
        summaryPage,
        withdrawApplicationEvent1Page,
        withdrawApplicationEventSubmitPage,
        withdrawApplicationEventConfirmPage,
      } = solicitor;

      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
      await summaryPage.chooseEventFromDropdown("Withdraw application");

      await withdrawApplicationEvent1Page.assertPageContents();
      await withdrawApplicationEvent1Page.verifyAccessibility();
      await withdrawApplicationEvent1Page.selectWithdrawApplication(
        withdrawApplication,
      );
      await withdrawApplicationEvent1Page.clickContinue();

      await withdrawApplicationEventSubmitPage.assertPageContents(
        ["caseProgression", "withdrawApplication"],
        snapshotName,
      );
      await withdrawApplicationEventSubmitPage.verifyAccessibility();
      await withdrawApplicationEventSubmitPage.clickSaveAndContinue();

      await withdrawApplicationEventConfirmPage.assertPageContents(
        withdrawApplication,
      );
      await withdrawApplicationEventConfirmPage.verifyAccessibility();
      await withdrawApplicationEventConfirmPage.clickCloseAndReturnToCaseDetails();

      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Withdraw application",
      );
      await summaryPage.assertCaseStatus(caseStatus);
    });
  });
});
