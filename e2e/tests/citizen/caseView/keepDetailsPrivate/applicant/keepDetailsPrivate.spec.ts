import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { KeepDetailsPrivate } from "../../../../../journeys/citizen/caseView/keepDetailsPrivate/applicant&Respondent/keepDetailsPrivate.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant keep details private tests", (): void => {
  test.beforeEach(
    async ({
      page,
      citizenC100CaseUtils,
      idamLoginHelper,
      accessCodeHelper,
    }) => {
      await ActivateCitizenC100Case.activateCase({
        page,
        citizenC100CaseUtils,
        idamLoginHelper,
        accessCodeHelper,
        isApplicant: true,
      });
    },
  );

  test("Applicant keep details private with yes response. @regression", async ({
    page,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      accessibilityTest: false,
      isApplicant: true,
      startAlternativeYesNo: true,
      yesNoDontKnow: "yes",
    });
  });

  test("Applicant keep details private with no response. @regression", async ({
    page,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      accessibilityTest: false,
      isApplicant: true,
      startAlternativeYesNo: false,
      yesNoDontKnow: "no",
    });
  });

  test("Applicant keep details private with dontKnow response. @regression @accessibility @nightly", async ({
    page,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      accessibilityTest: true,
      isApplicant: true,
      startAlternativeYesNo: true,
      yesNoDontKnow: "dontKnow",
    });
  });
});
