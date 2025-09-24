import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Allocate a judge to the case", () => {
  let caseNumber: string = "";

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACaseSendToGatekeeper(browser);
    await navigationUtils.goToCase(
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
        await allocatedJudge1Page.assertPageContents();
        await axeUtils.audit();
        await allocatedJudge1Page.selectIsJudgeOrLegalAdviser(
          isSpecificJudgeOrLegalAdviser,
        );
        await allocatedJudge1Page.selectJudgeOrLegalAdviser(
          isJudge,
          judgeOrLegalAdviserName,
        );
        await allocatedJudge1Page.clickContinue();
        await allocatedJudgeSubmitPage.assertPageContents({
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
        await allocatedJudge1Page.assertPageContents();
        await axeUtils.audit();
        await allocatedJudge1Page.selectIsJudgeOrLegalAdviser(
          isSpecificJudgeOrLegalAdviser,
        );
        await allocatedJudge1Page.selectJudiciaryTier(judgeTier);
        await allocatedJudge1Page.clickContinue();
        await allocatedJudgeSubmitPage.assertPageContents({
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
