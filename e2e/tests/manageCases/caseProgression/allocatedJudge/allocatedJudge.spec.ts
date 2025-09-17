import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Allocate a judge to the case", () => {
  let caseNumber: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseNumber = await caseEventUtils.createDACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
  });

  [
    {
      isSpecificJudgeOrLegalAdviser: true,
      judgeTier: "Circuit Judge",
      judgeLastName: "Williams",
      judgeEmailAddress: "HHJ.Elizabeth.Williams@ejudiciary.net",
      courtName: "Swansea Civil And Family Justice Centre",
    },
    {
      isSpecificJudgeOrLegalAdviser: false,
      judgeTier: "Magistrates",
      judgeLastName: null,
      judgeEmailAddress: null,
      courtName: "Swansea Civil And Family Justice Centre",
    },
  ].forEach(
    ({
      isSpecificJudgeOrLegalAdviser,
      judgeTier,
      judgeLastName,
      judgeEmailAddress,
      courtName,
    }) => {
      test(`Allocate a Judge to a DA case isSpecificJudgeOrLegalAdviser: ${isSpecificJudgeOrLegalAdviser} @nightly @regression`, async ({
        summaryPage,
        rolesAndAccessPage,
        allocatedJudge1Page,
        allocatedJudgeSubmitPage,
        axeUtils,
      }) => {
        await summaryPage.chooseEventFromDropdown("Allocated judge");
        await allocatedJudge1Page.checkPageContents();
        await axeUtils.audit();
        await allocatedJudge1Page.fillInFields(isSpecificJudgeOrLegalAdviser);
        await allocatedJudge1Page.clickContinue();
        await allocatedJudgeSubmitPage.checkPageContents(
          isSpecificJudgeOrLegalAdviser,
        );
        await axeUtils.audit();
        await allocatedJudgeSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Allocated judge",
        );
        await summaryPage.assertAllocatedJudgeSection(
          isSpecificJudgeOrLegalAdviser,
          judgeTier,
          courtName,
          judgeLastName,
          judgeEmailAddress,
        );
        if (isSpecificJudgeOrLegalAdviser) {
          await rolesAndAccessPage.goToPage();
          await rolesAndAccessPage.assertJudiciaryRolesAndAccess();
        }
      });
    },
  );
});
