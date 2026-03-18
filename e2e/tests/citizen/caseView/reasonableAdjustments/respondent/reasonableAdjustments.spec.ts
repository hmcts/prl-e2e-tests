import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { ReasonableAdjustments } from "../../../../../journeys/citizen/caseView/reasonableAdjustments/reasonableAdjustments.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent reasonable adjustments tests", (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({
      page,
      citizenC100CaseUtils,
      idamLoginHelper,
      accessCodeHelper,
    }) => {
      caseRef = await ActivateCitizenC100Case.activateCase({
        page,
        citizenC100CaseUtils,
        idamLoginHelper,
        accessCodeHelper,
        isApplicant: false,
      });
    },
  );

  test("Respondent reasonable adjustments - no reasonable adjustments. @regression @accessibility @nightly", async ({
    page,
    citizenC100CaseUtils,
  }): Promise<void> => {
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      needsReasonableAdjustment: false,
      accessibilityTest: true,
      isApplicant: false,
      citizenC100CaseUtils: citizenC100CaseUtils,
      caseRef: caseRef,
    });
  });

  test("Respondent reasonable adjustments - add reasonable adjustment. @regression", async ({
    page,
    citizenC100CaseUtils,
  }): Promise<void> => {
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      needsReasonableAdjustment: true,
      accessibilityTest: false,
      isApplicant: false,
      citizenC100CaseUtils: citizenC100CaseUtils,
      caseRef: caseRef,
    });
  });
});
