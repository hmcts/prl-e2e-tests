import { test } from "@playwright/test";
import IdamLoginHelper from "../../../common/userHelpers/idamLoginHelper.ts";
import Config from "../../../utils/config.utils.ts";
import { CitizenCreateInitial } from "../../../journeys/citizen/citizenCreateInitial.ts";

test.describe("Manage citizen cases case dashboard tests.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.setupAndSignInUser(
      page,
      Config.citizenFrontendBaseURL,
      "citizen",
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
