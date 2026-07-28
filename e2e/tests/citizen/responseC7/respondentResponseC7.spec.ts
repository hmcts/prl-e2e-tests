import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.ts";
import { RespondentResponseC7 } from "../../../journeys/citizen/caseView/respondToTheApplicationC7/respondentResponseC7.ts";
import { ActivateCitizenC100Case } from "../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent completes the C7 response from the citizen UI tests", (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({
      page,
      citizenC100CaseUtils,
      manageCasesEventUtils,
      idamLoginHelper,
      accessCodeHelper,
    }) => {
      caseRef = await ActivateCitizenC100Case.activateCase({
        page,
        citizenC100CaseUtils,
        manageCasesEventUtils,
        idamLoginHelper,
        accessCodeHelper,
        isApplicant: false,
      });
    },
  );

  test("Respondent completes the 'Respond to the application' form (C7). @regression @accessibility @nightly", async ({
    page,
    citizenC100CaseUtils,
  }): Promise<void> => {
    await RespondentResponseC7.respondentResponseC7({
      page: page,
      accessibilityTest: true,
      citizenC100CaseUtils,
      caseRef,
      errorMessaging: false,
      yesNoReasonableAdjustments: true,
      isApplicant: false,
    });
  });
});
