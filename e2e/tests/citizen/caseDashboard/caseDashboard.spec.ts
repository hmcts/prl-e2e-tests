import { test } from "@playwright/test";
import Config from "../../../config";
import { CitizenCreateInitial } from "../../../journeys/citizen/citizenCreateInitial";
import IdamLoginHelper from "../../../common/idamLoginHelper";

test.describe("Manage citizen cases case dashboard tests. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test("Check the case dashboard is visible to the user.", async ({
    page,
  }): Promise<void> => {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: false,
      childArrangementsJourney: "C100",
    });
  });
  test("Check the case dashboard is accessible @accessibilityCitizenFrontend", async ({
    page,
  }): Promise<void> => {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: true,
      childArrangementsJourney: "C100",
    });
  });
});
