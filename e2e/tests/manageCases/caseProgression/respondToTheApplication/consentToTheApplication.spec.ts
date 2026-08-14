import { test, expect } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";

test.describe("Respond to the application (C7) as the Respondent Solicitor tests.", () => {
  let caseRef: string;

  test.beforeEach(async ({ nocSolicitor, manageCasesEventUtils}) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.serviceOfApplication(caseRef, "C100");
    await manageCasesEventUtils.confidentialityCheck(caseRef);
    await NoticeOfChange.noticeOfChange({
      page: nocSolicitor.page,
      caseType: "C100",
      caseRef: caseRef,
      isApplicant: false,
      accessibilityTest: false,
    });
    // await navigationUtils.goToCase(
    //   caseWorker.page,
    //   config.manageCasesBaseURLCase,
    //   caseRef,
    // );
  });
    
  [{ familyManNumber: "1234", snapshotName: "c7-section1" }].forEach(
    ({ familyManNumber, snapshotName }) => {
      test("Complete C7 - Respond to the application with accessibility test. @nightly @accessibility @regression", async ({
        nocSolicitor,
      }): Promise<void> => {
        const {
          tasksPage,
          summaryPage,
        } = nocSolicitor;




  




        // 1 - ** Consent to the Application **

        //   2 - ** Respondent's details**

        // 3 -  ** Application details **

        //   4 - ** Safety Concerns **

        //     5 - ** Additional information **

        //       6 - ** View PDF response **

        //         7 - ** Submit(the last sub - task) **





// to update the steps below
        // await consentToThe.page1.assertPageContents();
        // await fl401AddCaseNumber.page1.verifyAccessibility();
        // await fl401AddCaseNumber.page1.fillInFields(familyManNumber);
        // await fl401AddCaseNumber.page1.clickContinue();

        // await fl401AddCaseNumber.submitPage.assertPageContents(
        //   ["caseProgression", "checkApplication"],
        //   snapshotName,
        // );
        // await fl401AddCaseNumber.submitPage.verifyAccessibility();
        // await fl401AddCaseNumber.submitPage.clickSaveAndContinue();

        // await summaryPage.alertBanner.assertEventAlert(
        //   caseNumber,
        //   "Add case number",
        // );

        // await historyPage.goToPage();
        // await expect(historyPage.eventHistoryName).toBeVisible();
      });
    },
  );
});