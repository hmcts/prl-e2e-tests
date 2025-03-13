import Config from "../../config.ts";
import { EdgeCase } from "../../journeys/edgeCases/edgeCaseJourney.ts";
import { test } from "@playwright/test";

test.describe("Create an edge case as a citizen", (): void => {
  test("Create an FGM edge case as a citizen", async ({ page }) => {
    await page.goto(Config.edgeCasesBaseURL);
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "FGM",
      applyMyself: true,
      under18: true,
      manualAddress: false,
    });
  });
});
