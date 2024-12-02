import { test } from "@playwright/test";
import IdamLoginHelper from "../../../common/idamLoginHelper";
import Config from "../../../config";
import { CitizenCreateInitial } from "../../../journeys/citizen/citizenCreateInitial";

test.describe("Manage citizen cases case dashboard tests.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test("Check the case dashboard is visible to the user. @regression @smoke", async ({
    page,
  }): Promise<void> => {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: false,
      childArrangementsJourney: "C100",
    });
  });
  test("Check the case dashboard is visible to the user and accessible @accessibility @nightly", async ({
    page,
  }): Promise<void> => {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: true,
      childArrangementsJourney: "C100",
    });
  });
});
