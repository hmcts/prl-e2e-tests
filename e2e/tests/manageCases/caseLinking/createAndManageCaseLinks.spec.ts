import { test } from "../../fixtures/fixtures.ts";
import config from "../../../utils/config.utils.ts";

test.describe("Create and manage linked DA cases as a court admin.", () => {
  let caseNumber: string = "";
  let linkedCaseNumber: string = "";

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      linkedCaseNumber = await caseEventUtils.createDACase(browser);

      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      caseName: "TEST",
      state: "Submitted",
      reasonsForCaseLink: ["Case consolidated", "Other"],
      otherReason: "TEST",
    },
  ].forEach(({ caseName, state, reasonsForCaseLink, otherReason }) => {
    test("Create and manage linked case. @nightly", async ({
      caseWorker,
      navigationUtils,
    }) => {
      const { summaryPage, linkedCasesPage, manageCaseLinks } = caseWorker;
      // Create case link journey
      await summaryPage.chooseEventFromDropdown("Link cases");

      await manageCaseLinks.createCaseLink1Page.assertPageContents();
      await manageCaseLinks.createCaseLink1Page.verifyAccessibility();
      await manageCaseLinks.createCaseLink1Page.clickContinue();

      await manageCaseLinks.createCaseLink2Page.assertPageContents();
      // await createCaseLink2Page.verifyAccessibility(); // TODO: failing accessibility waiting on FPVTL-1242
      await manageCaseLinks.createCaseLink2Page.proposeCaseLink({
        linkedCaseNumber,
        reasonsForCaseLink,
        otherReason,
      });
      await manageCaseLinks.createCaseLink2Page.assertProposedCaseLinksTableContents(
        {
          caseName,
          linkedCaseNumber,
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

      await summaryPage.alertBanner.assertEventAlert(caseNumber, "Link Cases");

      // check linked cases tab
      await linkedCasesPage.goToPage();
      await linkedCasesPage.assertPageContents({
        linkedToTableRowParams: [
          {
            caseName,
            linkedCaseNumber,
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
        linkedCaseNumber,
      );

      await linkedCasesPage.goToPage();
      await linkedCasesPage.clickShowHideLink();
      await linkedCasesPage.assertPageContents({
        linkedFromTableRowParams: [
          {
            caseName,
            linkedCaseNumber: caseNumber,
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
        caseNumber,
      );

      await summaryPage.chooseEventFromDropdown("Manage case links");

      await manageCaseLinks.maintainCaseLink1Page.assertPageContents();
      await manageCaseLinks.maintainCaseLink1Page.verifyAccessibility();
      await manageCaseLinks.maintainCaseLink1Page.clickContinue();

      await manageCaseLinks.maintainCaseLink2Page.assertPageContents(
        caseName,
        linkedCaseNumber,
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
        caseNumber,
        "Manage case links",
      );

      // check linked cases tab
      await linkedCasesPage.goToPage();
      await linkedCasesPage.assertPageContents({});

      // check the linked cases tab for the case that has been linked from
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        linkedCaseNumber,
      );
      await linkedCasesPage.goToPage();
      await linkedCasesPage.assertPageContents({});
    });
  });
});
