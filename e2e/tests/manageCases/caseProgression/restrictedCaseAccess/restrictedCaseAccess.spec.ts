import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { caseTypes } from "../../../../common/types.ts";

caseTypes.forEach((caseType) => {
  test.describe(`Complete the Restricted Case Access event`, () => {
    let caseRef: string;

    test.beforeEach(
      async ({ judge, manageCasesEventUtils, navigationUtils }) => {
        caseRef = (await manageCasesEventUtils.submitTSSolicitorCase(caseType))
          .caseRef;
        if (caseType === "C100") {
          await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
        }
        await manageCasesEventUtils.sendToGatekeeper(caseRef, caseType, {
          isSpecificGatekeeper: true,
          isJudge: true,
        });
        await navigationUtils.goToCase(
          judge.page,
          config.manageCasesBaseURLCase,
          caseRef,
        );
      },
    );

    test(`Mark ${caseType} case as restricted as a gatekeeper judge. @nightly @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      const restrictionReason: string = "Test reason";
      const { summaryPage, restrictedCaseAccess } = judge;

      await summaryPage.chooseEventFromDropdown("Mark case as restricted");

      await restrictedCaseAccess.page1.assertPageContents();
      await restrictedCaseAccess.page1.verifyAccessibility();
      await restrictedCaseAccess.page1.clickContinue();

      await restrictedCaseAccess.page2.assertPageContents();
      await restrictedCaseAccess.page2.verifyAccessibility();
      await restrictedCaseAccess.page2.enterRestrictionReason(
        restrictionReason,
      );
      await restrictedCaseAccess.page2.clickMarkCaseAsRestricted();

      await restrictedCaseAccess.submitPage.assertPageContents(
        ["caseProgression", "restrictedCaseAccess"],
        `${caseType}-mark-case-as-restricted`,
      );
      await restrictedCaseAccess.submitPage.verifyAccessibility();
      await restrictedCaseAccess.submitPage.clickMarkCaseAsRestricted();

      await restrictedCaseAccess.confirmPage.assertPageContents();
      await restrictedCaseAccess.confirmPage.verifyAccessibility();
      await restrictedCaseAccess.confirmPage.clickCloseAndReturnToCaseDetails();

      await summaryPage.assertCaseRestricted(restrictionReason);
    });
  });
});
