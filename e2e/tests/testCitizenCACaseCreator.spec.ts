import { test } from "@playwright/test";
import Config from "../utils/config.utils.ts";
import { CitizenC100ApiCase } from "../journeys/citizen/createCase/createAndSubmitCitizenC100API.ts";

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
