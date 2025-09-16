import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Allocate a judge to the case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  [
    { isSpecificJudgeOrLegalAdviser: true },
    { isSpecificJudgeOrLegalAdviser: false },
  ].forEach(({ isSpecificJudgeOrLegalAdviser }) => {
    test(`Allocate a Judge to a DA case isSpecificJudgeOrLegalAdviser: ${isSpecificJudgeOrLegalAdviser} @nightly @regression - POM`, async ({
      summaryPage,
      allocatedJudge1Page,
      allocatedJudgeSubmitPage,
    }) => {
      await summaryPage.chooseEventFromDropdown("Allocated judge");
      await allocatedJudge1Page.checkPageContents();
      await allocatedJudge1Page.fillInFields(isSpecificJudgeOrLegalAdviser);
      await allocatedJudge1Page.clickContinue();
      await allocatedJudgeSubmitPage.checkPageContents(
        isSpecificJudgeOrLegalAdviser,
      );
      await allocatedJudgeSubmitPage.clickSubmit();
      // TODO: Check roles and access tab to make sure judge has been assigned correctly
    });
  });
});
