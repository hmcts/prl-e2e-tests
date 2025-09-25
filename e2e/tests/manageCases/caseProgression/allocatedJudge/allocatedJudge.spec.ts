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
      isJudge: true,
      judgeOrLegalAdviserName: "Ms Elizabeth Williams",
      judgeTier: "Circuit Judge",
      judgeLastName: "Williams",
      judgeEmailAddress: "HHJ.Elizabeth.Williams@ejudiciary.net",
      courtName: "Swansea Civil And Family Justice Centre",
    },
  ].forEach(
    ({
      isSpecificJudgeOrLegalAdviser,
      isJudge,
      judgeOrLegalAdviserName,
      judgeTier,
      judgeLastName,
      judgeEmailAddress,
      courtName,
    }) => {
      test(`Allocate a Judge to a DA case specific judge @nightly @regression`, async ({
        summaryPage,
        rolesAndAccessPage,
        allocatedJudge1Page,
        allocatedJudgeSubmitPage,
        axeUtils,
      }) => {
        await summaryPage.chooseEventFromDropdown("Allocated judge");
        await allocatedJudge1Page.checkPageContents();
        await axeUtils.audit();
        await allocatedJudge1Page.selectIsJudgeOrLegalAdviser(
          isSpecificJudgeOrLegalAdviser,
        );
        await allocatedJudge1Page.selectJudgeOrLegalAdviser(
          isJudge,
          judgeOrLegalAdviserName,
        );
        await allocatedJudge1Page.clickContinue();
        await allocatedJudgeSubmitPage.checkPageContents({
          isSpecificJudgeOrLegalAdviser,
          isJudge,
        });
        await axeUtils.audit();
        await allocatedJudgeSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Allocated judge",
        );
        await summaryPage.assertAllocatedJudgeSection({
          isSpecificJudgeOrLegalAdviser,
          isJudge,
          judgeTier,
          courtName,
          judgeLastName,
          judgeEmailAddress,
        });
        await rolesAndAccessPage.goToPage();
        await rolesAndAccessPage.assertJudiciaryRolesAndAccess(
          judgeOrLegalAdviserName,
        );
      });
    },
  );

  [
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
      test(`Allocate a Judge to a DA case non-specific judge @regression`, async ({
        summaryPage,
        allocatedJudge1Page,
        allocatedJudgeSubmitPage,
        axeUtils,
      }) => {
        await summaryPage.chooseEventFromDropdown("Allocated judge");
        await allocatedJudge1Page.checkPageContents();
        await axeUtils.audit();
        await allocatedJudge1Page.selectIsJudgeOrLegalAdviser(
          isSpecificJudgeOrLegalAdviser,
        );
        await allocatedJudge1Page.selectJudiciaryTier(judgeTier);
        await allocatedJudge1Page.clickContinue();
        await allocatedJudgeSubmitPage.checkPageContents({
          isSpecificJudgeOrLegalAdviser,
          judgeTier,
        });
        await axeUtils.audit();
        await allocatedJudgeSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Allocated judge",
        );
        await summaryPage.assertAllocatedJudgeSection({
          isSpecificJudgeOrLegalAdviser,
          judgeTier,
          courtName,
          judgeLastName,
          judgeEmailAddress,
        });
      });
    },
  );
});
