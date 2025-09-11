import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Solicitor case tests.", () => {
  let caseNumber: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
  });

  [{ familyManNumber: "1234" }].forEach(({ familyManNumber }) => {
    test("Complete Task - Check Application with accessibility test. @nightly @accessibility @regression", async ({
      summaryPage,
      axeUtils,
      tasksPage,
      fl401AddCaseNumber1Page,
      fl401AddCaseNumberSubmitPage,
    }): Promise<void> => {
      await tasksPage.exuiHeader.checkIsVisible();
      await tasksPage.assignTaskToMeAndTriggerNextSteps(
        "Check Application",
        "Add Case Number",
      );
      await fl401AddCaseNumber1Page.checkPageContents();
      await axeUtils.audit();
      await fl401AddCaseNumber1Page.fillInFields(familyManNumber);
      await fl401AddCaseNumber1Page.clickContinue();
      await fl401AddCaseNumberSubmitPage.checkPageContents(familyManNumber);
      await axeUtils.audit();
      await fl401AddCaseNumberSubmitPage.clickSaveAndContinue();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Add case number",
      );
      await summaryPage.caseHeader.assertFamilyManNumberIsVisible(
        familyManNumber,
      );
    });
  });
});
