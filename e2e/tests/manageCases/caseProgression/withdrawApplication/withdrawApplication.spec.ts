import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("Withdraw C100 (Solicitor created) application event as a solicitor", () => {
  let caseRef: string;
  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseRef = await caseEventUtils.createCACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

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
      summaryPage,
      withdrawApplicationEvent1Page,
      withdrawApplicationEventSubmitPage,
      withdrawApplicationEventConfirmPage,
      axeUtils,
    }): Promise<void> => {
      await summaryPage.chooseEventFromDropdown("Withdraw application");
      await withdrawApplicationEvent1Page.assertPageContents();
      await axeUtils.audit();

      await withdrawApplicationEvent1Page.selectWithdrawApplication(
        withdrawApplication,
      );
      await withdrawApplicationEvent1Page.clickContinue();

      await withdrawApplicationEventSubmitPage.assertPageContents(
        ["caseProgression", "withdrawApplication"],
        snapshotName,
      );
      await axeUtils.audit();
      await withdrawApplicationEventSubmitPage.clickSaveAndContinue();

      await withdrawApplicationEventConfirmPage.assertPageContents(
        withdrawApplication,
      );
      await axeUtils.audit();
      await withdrawApplicationEventConfirmPage.clickCloseAndReturnToCaseDetails();

      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Withdraw application",
      );
      await summaryPage.assertCaseStatus(caseStatus);
    });
  });
});
