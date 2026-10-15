import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.ts";
import { BasicCaseData } from "../../../utils/manageCaseEvent.utils.ts";

test.describe("Create and manage linked DA cases as a court admin.", () => {
  let caseRef: string = "";
  let caseName: string = "";
  let linkedCaseRef: string = "";
  let linkedCaseName: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      const caseData =
        await manageCasesEventUtils.submitTSSolicitorCase("FL401");
      caseRef = caseData.caseRef;
      caseName = caseData.caseName;

      const linkedCaseData: BasicCaseData =
        await manageCasesEventUtils.submitTSSolicitorCase("FL401");
      linkedCaseRef = linkedCaseData.caseRef;
      linkedCaseName = linkedCaseData.caseName;

      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  [
    {
      state: "Submitted",
      reasonsForCaseLink: ["Case consolidated", "Other"],
      otherReason: "TEST",
    },
  ].forEach(({ state, reasonsForCaseLink, otherReason }) => {
    test("Create and manage linked case. @nightly", async ({
      caseWorker,
      navigationUtils,
    }) => {
      const { summaryPage, manageCaseLinks } = caseWorker;
      // Create case link journey
      await summaryPage.chooseEventFromDropdown("Link cases");

      await manageCaseLinks.createCaseLink1Page.assertPageContents();
      await manageCaseLinks.createCaseLink1Page.verifyAccessibility();
      await manageCaseLinks.createCaseLink1Page.clickContinue();

      await manageCaseLinks.createCaseLink2Page.assertPageContents();
      // await createCaseLink2Page.verifyAccessibility(); // TODO: failing accessibility waiting on FPVTL-1242
      await manageCaseLinks.createCaseLink2Page.proposeCaseLink({
        linkedCaseNumber: linkedCaseRef,
        reasonsForCaseLink,
        otherReason,
      });
      await manageCaseLinks.createCaseLink2Page.assertProposedCaseLinksTableContents(
        {
          caseName: linkedCaseName,
          linkedCaseNumber: linkedCaseRef,
          state,
          reasonsForCaseLink,
          otherReason,
        },
      );
      await manageCaseLinks.createCaseLink2Page.clickContinue();

      await manageCaseLinks.createCaseLink3Page.assertPageContents();
      await manageCaseLinks.createCaseLink3Page.verifyAccessibility();
      await manageCaseLinks.createCaseLink3Page.clickContinue();

      await manageCaseLinks.createCaseLinkSubmitPage.assertPageContents();
      await manageCaseLinks.createCaseLinkSubmitPage.verifyAccessibility();
      await manageCaseLinks.createCaseLinkSubmitPage.clickCreateCaseLink();

      await summaryPage.alertBanner.assertEventAlert(caseRef, "Link Cases");

      // check linked cases tab
      await manageCaseLinks.linkedCasesTab.goToPage();
      await manageCaseLinks.linkedCasesTab.assertPageContents({
        linkedToTableRowParams: [
          {
            caseName: linkedCaseName,
            linkedCaseNumber: linkedCaseRef,
            state,
            reasonsForCaseLink,
            otherReason,
          },
        ],
      });

      // check the linked cases tab for the case that has been linked from
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        linkedCaseRef,
      );

      await manageCaseLinks.linkedCasesTab.goToPage();
      await manageCaseLinks.linkedCasesTab.clickShowHideLink();
      await manageCaseLinks.linkedCasesTab.assertPageContents({
        linkedFromTableRowParams: [
          {
            caseName: caseName,
            linkedCaseNumber: caseRef,
            state,
            reasonsForCaseLink,
            otherReason,
          },
        ],
      });

      // manage case links journey
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );

      await summaryPage.chooseEventFromDropdown("Manage case links");

      await manageCaseLinks.maintainCaseLink1Page.assertPageContents();
      await manageCaseLinks.maintainCaseLink1Page.verifyAccessibility();
      await manageCaseLinks.maintainCaseLink1Page.clickContinue();

      await manageCaseLinks.maintainCaseLink2Page.assertPageContents(
        linkedCaseName,
        linkedCaseRef,
      );

      // await maintainCaseLink2Page.verifyAccessibility();  // TODO: failing accessibility waiting on FPVTL-1242
      await manageCaseLinks.maintainCaseLink2Page.selectCaseToUnlink();
      await manageCaseLinks.maintainCaseLink2Page.clickContinue();

      await manageCaseLinks.maintainCaseLink3Page.assertPageContents();
      await manageCaseLinks.maintainCaseLink3Page.verifyAccessibility();
      await manageCaseLinks.maintainCaseLink3Page.clickContinue();

      await manageCaseLinks.maintainCaseLinkSubmitPage.assertPageContents();
      await manageCaseLinks.maintainCaseLinkSubmitPage.verifyAccessibility();
      await manageCaseLinks.maintainCaseLinkSubmitPage.clickMaintainCaseLink();

      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Manage case links",
      );

      // check linked cases tab
      await manageCaseLinks.linkedCasesTab.goToPage();
      await manageCaseLinks.linkedCasesTab.assertPageContents({});

      // check the linked cases tab for the case that has been linked from
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        linkedCaseRef,
      );
      await manageCaseLinks.linkedCasesTab.goToPage();
      await manageCaseLinks.linkedCasesTab.assertPageContents({});
    });
  });
});
