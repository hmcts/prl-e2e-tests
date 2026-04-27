import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { ContactPreferences } from "../../../../../journeys/citizen/caseView/contactPreferences/contactPreferences.ts";
import { ActivateCitizenC100Case } from "../../../../../journeys/citizen/activateCase/activateCitizenC100Case.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests", (): void => {
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

  test("Applicant contact preferences. @regression @accessibility @nightly", async ({
    page,
  }): Promise<void> => {
    await ContactPreferences.contactPreferences({
      page: page,
      accessibilityTest: true,
      isApplicant: true,
      contactOption: "Post",
    });
  });
});
