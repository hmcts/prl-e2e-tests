import Config from "../../../utils/config.utils.ts";
import { test } from "../../fixtures.ts";
import { caseTypes } from "../../../common/types.ts";
import { BasicCaseData } from "../../../utils/manageCaseEvent.utils.ts";

caseTypes.forEach((caseType) => {
  test.describe(`Returned ${caseType} application tests`, (): void => {
    let caseData: BasicCaseData;

    test.beforeEach(
      async ({ courtAdminStoke, manageCasesEventUtils, navigationUtils }) => {
        caseData = await manageCasesEventUtils.submitTSSolicitorCase(caseType);
        await navigationUtils.goToCase(
          courtAdminStoke.page,
          Config.manageCasesBaseURLCase,
          caseData.caseRef,
        );
      },
    );

    test(`Return application @nightly @accessibility @regression`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      const rejectionReason: string = "Application incomplete";
      const { summaryPage, historyPage, partiesPage, returnApplication } =
        courtAdminStoke;

      await summaryPage.chooseEventFromDropdown("Return application");

      await returnApplication.page1.assertPageContents(caseType);
      await returnApplication.page1.verifyAccessibility();
      await returnApplication.page1.selectRejectionReason(rejectionReason);
      await returnApplication.page1.clickContinue();

      await returnApplication.page2.assertPageContents(
        caseData.caseRef,
        caseData.caseName,
        rejectionReason,
        caseType,
      );
      await returnApplication.page2.verifyAccessibility();
      await returnApplication.page2.clickContinue();

      await returnApplication.submitPage.assertPageContents(
        // TODO: need to mask the information that could change in the screenshot
        ["caseProgression", "returnApplication"],
        `${caseType}-return-application`,
      );
      await returnApplication.submitPage.verifyAccessibility();
      await returnApplication.submitPage.clickSaveAndContinue();

      await partiesPage.alertBanner.assertEventAlert(
        caseData.caseRef,
        "Return application",
      );

      // check status is correct
      await historyPage.goToPage();
      await historyPage.verifyEventHistory("Return application", "Returned");
    });
  });
});
