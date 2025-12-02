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
      const {
        summaryPage,
        linkedCasesPage,
        createCaseLink1Page,
        createCaseLink2Page,
        createCaseLink3Page,
        createCaseLinkSubmitPage,
        maintainCaseLink1Page,
        maintainCaseLink2Page,
        maintainCaseLink3Page,
        maintainCaseLinkSubmitPage,
      } = caseWorker;
      // Create case link journey
      await summaryPage.chooseEventFromDropdown("Link cases");

      await createCaseLink1Page.assertPageContents();
      await createCaseLink1Page.verifyAccessibility();
      await createCaseLink1Page.clickContinue();

      await createCaseLink2Page.assertPageContents();
      // await createCaseLink2Page.verifyAccessibility(); // TODO: failing accessibility waiting on FPVTL-1242
      await createCaseLink2Page.proposeCaseLink({
        linkedCaseNumber,
        reasonsForCaseLink,
        otherReason,
      });
      await createCaseLink2Page.assertProposedCaseLinksTableContents({
        caseName,
        linkedCaseNumber,
        state,
        reasonsForCaseLink,
        otherReason,
      });
      await createCaseLink2Page.clickContinue();

      await createCaseLink3Page.assertPageContents();
      await createCaseLink3Page.verifyAccessibility();
      await createCaseLink3Page.clickContinue();

      await createCaseLinkSubmitPage.assertPageContents();
      await createCaseLinkSubmitPage.verifyAccessibility();
      await createCaseLinkSubmitPage.clickCreateCaseLink();

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

      await maintainCaseLink1Page.assertPageContents();
      await maintainCaseLink1Page.verifyAccessibility();
      await maintainCaseLink1Page.clickContinue();

      await maintainCaseLink2Page.assertPageContents(
        caseName,
        linkedCaseNumber,
      );

      // await maintainCaseLink2Page.verifyAccessibility();  // TODO: failing accessibility waiting on FPVTL-1242
      await maintainCaseLink2Page.selectCaseToUnlink();
      await maintainCaseLink2Page.clickContinue();

      await maintainCaseLink3Page.assertPageContents();
      await maintainCaseLink3Page.verifyAccessibility();
      await maintainCaseLink3Page.clickContinue();

      await maintainCaseLinkSubmitPage.assertPageContents();
      await maintainCaseLinkSubmitPage.verifyAccessibility();
      await maintainCaseLinkSubmitPage.clickMaintainCaseLink();

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
