import Config from "../../config.ts";
import { EdgeCase } from "../../journeys/edgeCases/edgeCaseJourney.ts";
import { test } from "@playwright/test";
import createDaCitizenCourtNavCase from "../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import config from "../../config.ts";

test.describe("Create an FXXX edge case as a citizen", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Config.edgeCasesBaseURL);
  });
  test("Create an FGM edge case as a citizen", async ({ page }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "FGM",
      applyMyself: true,
      under18: true,
      manualAddress: true,
    });
  });
  test("Create an FMPO edge case as a citizen", async ({ page }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "FMPO",
      applyMyself: false,
      under18: false,
      manualAddress: false,
    });
  });
});
