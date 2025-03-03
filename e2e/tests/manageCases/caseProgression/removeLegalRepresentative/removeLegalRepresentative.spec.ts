import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import { RemoveLegalRepresentative } from "../../../../journeys/manageCases/caseProgression/removeLegalRepresentative/removeLegalRepresentative.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Complete Remove legal representative event as a court admin", () => {
  test(`Remove legal representation from applicants and check on Parties tab @regression @nightly @nightlyDev`, async ({
    page,
    browser,
  }): Promise<void> => {
    await RemoveLegalRepresentative.removeLegalRepresentative({
      page: page,
      browser: browser,
      accessibilityTest: true,
    });
  });
});
