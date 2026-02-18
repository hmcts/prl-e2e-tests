import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.describe("Allocate a judge to the case", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - roles and access doesn't work",
  );

  let caseNumber: string = "";

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACaseSendToGatekeeper(browser);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      isSpecificJudgeOrLegalAdviser: true,
      isJudge: true,
      judgeOrLegalAdviserName: "Ms Elizabeth Williams",
      judgeTier: "Circuit Judge",
      judgeLastName: "Williams",
      judgeEmailAddress: "HHJ.Elizabeth.Williams@ejudiciary.net",
      courtName: "Swansea Civil And Family Justice Centre",
      snapshotName: "allocated-judge-specific-judge",
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
      snapshotName,
    }) => {
      test(`Allocate a Judge to a DA case specific judge @nightly @regression`, async ({
        caseWorker,
      }) => {
        const { summaryPage, allocatedJudge, rolesAndAccessPage } = caseWorker;

        await summaryPage.chooseEventFromDropdown("Allocated judge");

        await allocatedJudge.page1.assertPageContents();
        await allocatedJudge.page1.verifyAccessibility();
        await allocatedJudge.page1.selectIsJudgeOrLegalAdviser(
          isSpecificJudgeOrLegalAdviser,
        );
        await allocatedJudge.page1.selectJudgeOrLegalAdviser(
          isJudge,
          judgeOrLegalAdviserName,
        );
        await allocatedJudge.page1.clickContinue();

        await allocatedJudge.submitPage.assertPageContents(
          ["caseProgression", "allocatedJudge"],
          snapshotName,
        );
        await allocatedJudge.submitPage.verifyAccessibility();
        await allocatedJudge.submitPage.clickSubmit();

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
        await rolesAndAccessPage.assertRolesAndAccessSection(
          "Judiciary",
          judgeOrLegalAdviserName,
          "Allocated Judge",
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
      snapshotName: "allocated-judge-magistrates",
    },
  ].forEach(
    ({
      isSpecificJudgeOrLegalAdviser,
      judgeTier,
      judgeLastName,
      judgeEmailAddress,
      courtName,
      snapshotName,
    }) => {
      test(`Allocate a Judge to a DA case non-specific judge @regression`, async ({
        caseWorker,
      }) => {
        const { summaryPage, allocatedJudge } = caseWorker;

        await summaryPage.chooseEventFromDropdown("Allocated judge");

        await allocatedJudge.page1.assertPageContents();
        await allocatedJudge.page1.verifyAccessibility();
        await allocatedJudge.page1.selectIsJudgeOrLegalAdviser(
          isSpecificJudgeOrLegalAdviser,
        );
        await allocatedJudge.page1.selectJudiciaryTier(judgeTier);
        await allocatedJudge.page1.clickContinue();

        await allocatedJudge.submitPage.assertPageContents(
          ["caseProgression", "allocatedJudge"],
          snapshotName,
        );
        await allocatedJudge.submitPage.verifyAccessibility();
        await allocatedJudge.submitPage.clickSubmit();

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
