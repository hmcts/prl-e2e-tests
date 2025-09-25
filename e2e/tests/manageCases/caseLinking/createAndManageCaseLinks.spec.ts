import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Create and manage linked DA cases as a court admin.", () => {
  let caseNumber: string = "";
  let linkedCaseNumber: string = "";

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    linkedCaseNumber = await caseEventUtils.createDACase(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
  });

  [
    {
      caseName: "TEST",
      state: "Submitted",
      reasonsForCaseLink: ["Case consolidated", "Other"],
      otherReason: "TEST",
    },
  ].forEach(({ caseName, state, reasonsForCaseLink, otherReason }) => {
    test("Create and manage linked case. @nightly @regression @accessibility", async ({
      summaryPage,
      createCaseLink1Page,
      createCaseLink2Page,
      createCaseLink3Page,
      createCaseLinkSubmitPage,
      maintainCaseLink1Page,
      maintainCaseLink2Page,
      maintainCaseLink3Page,
      maintainCaseLinkSubmitPage,
      linkedCasesPage,
      navigationUtils,
      axeUtils,
    }): Promise<void> => {
      // Create case link journey
      await summaryPage.chooseEventFromDropdown("Link cases");
      await createCaseLink1Page.assertPageContents();
      await axeUtils.audit();
      await createCaseLink1Page.clickContinue();
      await createCaseLink2Page.assertPageContents();
      // await axeUtils.audit(); // TODO: failing accessibility waiting on FPVTL-1242
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
      await axeUtils.audit();
      await createCaseLink3Page.clickContinue();
      await createCaseLinkSubmitPage.assertPageContents();
      await axeUtils.audit();
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
        config.manageCasesBaseURLCase,
        linkedCaseNumber,
        "Summary",
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
        config.manageCasesBaseURLCase,
        caseNumber,
        "Summary",
      );
      await summaryPage.chooseEventFromDropdown("Manage case links");
      await maintainCaseLink1Page.assertPageContents();
      await axeUtils.audit();
      await maintainCaseLink1Page.clickContinue();
      await maintainCaseLink2Page.assertPageContents(
        caseName,
        linkedCaseNumber,
      );
      // await axeUtils.audit();  // TODO: failing accessibility waiting on FPVTL-1242
      await maintainCaseLink2Page.selectCaseToUnlink();
      await maintainCaseLink2Page.clickContinue();
      await maintainCaseLink3Page.assertPageContents();
      await axeUtils.audit();
      await maintainCaseLink3Page.clickContinue();
      await maintainCaseLinkSubmitPage.assertPageContents();
      await axeUtils.audit();
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
        config.manageCasesBaseURLCase,
        linkedCaseNumber,
        "Summary",
      );
      await linkedCasesPage.goToPage();
      await linkedCasesPage.assertPageContents({});
    });
  });
});
