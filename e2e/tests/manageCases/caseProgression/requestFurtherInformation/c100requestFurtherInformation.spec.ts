import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.describe("C100 - Complete Request further information event", () => {
  test.beforeEach(
    async ({
      courtAdminStoke,
      judge,
      superUser,
      manageCasesEventUtils,
      navigationUtils,
    }) => {
      const caseRef = (
        await manageCasesEventUtils.submitTSSolicitorCase("C100")
      ).caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");

      const users = [courtAdminStoke, judge, superUser];

      for (const user of users) {
        await navigationUtils.goToCase(
          user.page,
          config.manageCasesBaseURLCase,
          caseRef,
        );
      }
    },
  );

  [
    {
      furtherInfoReasons: [
        "Applicant - further information required",
        "DWP/HMRC - whereabouts unknown",
      ],
      snapshotNameRequestFurtherInfo: "C100-request-further-information",
      snapshotsPathRequestFurtherInfo: [
        "caseProgression",
        "requestFurtherInformation",
      ],
      snapshotNameAddACaseNote: "C100-add-a-case-note",
      snapshotsPathAddACaseNote: ["caseProgression", "addACaseNote"],
      snapShotNameExitAwaitingInformation: "C100-exit-awaiting-information",
      snapShotPathExitAwaitingInformation: [
        "caseProgression",
        "exitAwaitingInformation",
      ],
    },
  ].forEach((data) => {
    test("Request further information for C100 case as Court Admin, Judge adds note as further information, superuser exits awaiting information state with the following options: Case: C100, Accessibility testing: yes. @nightly @accessibility @regression", async ({
      courtAdminStoke,
      judge,
      superUser,
    }): Promise<void> => {
      //court admin stoke
      const {
        summaryPage: summaryPageCA,
        requestFurtherInformation,
        addACaseNote,
      } = courtAdminStoke;
      await summaryPageCA.chooseEventFromDropdown(
        "Request Further Information",
      );
      await requestFurtherInformation.requestFurtherInformation1Page.assertPageContents();
      await requestFurtherInformation.requestFurtherInformation1Page.verifyAccessibility();
      await requestFurtherInformation.requestFurtherInformation1Page.checkErrorMessaging();
      await requestFurtherInformation.requestFurtherInformation1Page.provideInformationDetails(
        data.furtherInfoReasons,
      );
      await requestFurtherInformation.requestFurtherInformation1Page.clickContinue();
      await requestFurtherInformation.requestFurtherInformationSubmitPage.assertPageContents(
        data.snapshotsPathRequestFurtherInfo,
        data.snapshotNameRequestFurtherInfo,
      );
      await requestFurtherInformation.requestFurtherInformationSubmitPage.verifyAccessibility();
      await requestFurtherInformation.requestFurtherInformationSubmitPage.clickSaveAndContinue();
      await summaryPageCA.assertCaseStatus("Awaiting information");

      //judge
      const { summaryPage: summaryPageJudge, historyPage } = judge;
      await summaryPageJudge.reloadPage();
      await summaryPageJudge.assertEventVisibilityInDropdown(
        false,
        "Request Further Information",
      );
      await historyPage.goToPage();
      await historyPage.verifyEventHistory(
        "Further Information Reasons",
        "Awaiting Information",
      );

      //Cout admin
      await summaryPageCA.chooseEventFromDropdown("Add a case note");
      await addACaseNote.addACaseNote1Page.assertPageContents();
      //await addACaseNote.addACaseNote1Page.verifyAccessibility(); //FPVTL-3499 - Contrast error locked banner
      await addACaseNote.addACaseNote1Page.completeCaseNoteDetails();
      await addACaseNote.addACaseNote1Page.clickContinue();
      await addACaseNote.addACaseNoteSubmitPage.assertPageContents(
        data.snapshotsPathAddACaseNote,
        data.snapshotNameAddACaseNote,
      );
      //await addACaseNote.addACaseNoteSubmitPage.verifyAccessibility(); //FPVTL-3499 - Contrast error locked banner
      await addACaseNote.addACaseNoteSubmitPage.clickSaveAndContinue();
      await summaryPageCA.assertCaseStatus("Awaiting information");

      //Superuser
      const { exitAwaitingInformation, summaryPage: summaryPageSuper } =
        superUser;
      await summaryPageSuper.reloadPage();
      await summaryPageSuper.chooseEventFromDropdown(
        "Exit Awaiting Information",
      );
      await exitAwaitingInformation.page1.assertPageContents();
      //await exitAwaitingInformation.page1.verifyAccessibility(); //FPVTL-3499 - Contrast error locked banner
      await exitAwaitingInformation.page1.checkErrorMessages();
      await exitAwaitingInformation.page1.selectPreviousState("Gatekeeping");
      await exitAwaitingInformation.page1.clickContinue();
      await exitAwaitingInformation.submitPage.assertPageContents(
        data.snapShotPathExitAwaitingInformation,
        data.snapShotNameExitAwaitingInformation,
      );
      //await exitAwaitingInformation.submitPage.verifyAccessibility(); //FPVTL-3499 - Contrast error locked banner
      await exitAwaitingInformation.submitPage.clickSaveAndContinue();
      await summaryPageSuper.assertCaseStatus("Gatekeeping");
    });
  });
});
