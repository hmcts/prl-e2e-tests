import { test } from "../../fixtures.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Link DA cases as a court admin.", () => {
  let caseNumber: string = "";
  let linkedCaseNumber: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    linkedCaseNumber = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
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
    test("Link cases. With accessibility test. @nightly @accessibility", async ({
      page,
      summaryPage,
      createCaseLink1Page,
      createCaseLink2Page,
      createCaseLink3Page,
      createCaseLinkSubmitPage,
      linkedCasesPage,
      axeUtils,
    }): Promise<void> => {
      // Create case link
      await summaryPage.chooseEventFromDropdown("Link cases");
      await createCaseLink1Page.checkPageContents();
      await axeUtils.audit();
      await createCaseLink1Page.clickContinue();
      await createCaseLink2Page.checkPageContents();
      // await axeUtils.audit();    TODO: add ticket due to failing accessibility
      await createCaseLink2Page.proposeCaseLink({
        caseName,
        linkedCaseNumber,
        state,
        reasonsForCaseLink,
        otherReason,
      });
      await createCaseLink2Page.clickContinue();
      await createCaseLink3Page.assertPageContents({
        caseName,
        linkedCaseNumber,
        reasonsForCaseLink,
        otherReason,
      });
      await axeUtils.audit();
      await createCaseLink3Page.clickContinue();
      await createCaseLinkSubmitPage.checkPageContents();
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
      await Helpers.goToCase(
        page,
        config.manageCasesBaseURLCase,
        linkedCaseNumber,
        "tasks",
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

      // TODO: Add manage case links part of the journey
    });
  });
});
