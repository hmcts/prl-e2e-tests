import { test } from "@playwright/test";
import Config from "../config";
import { CitizenC100ApiCase } from "../journeys/citizen/createCase/createAndSubmitCitizenC100API";

const citizenUrl = Config.citizenFrontendBaseURL as string;

test.describe("Citizen CA Case creation examples", () => {
  test("Create and submit a citizen CA case @nightly @regression", async ({
    page,
  }) => {
    await CitizenC100ApiCase.createAndSubmitDraftCase({
      page,
      accessibilityTest: false,
      application: citizenUrl,
      errorMessaging: false,
    });
  });
});
