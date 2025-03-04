import { test } from "@playwright/test";
import {CitizenCACaseCreator} from "../common/caseHelpers/citizenCACaseCreateHelper.ts";
import Config from "../config.ts";
const citizenUrl = Config.citizenFrontendBaseURL as string;

test.describe("Citizen CA Case creation examples", (): void => {
  test("create citizen CA case and submit and pay", async ({ page }): Promise<void> => {
    await CitizenCACaseCreator.createDraftCitizenCACase(page, citizenUrl);
  });
});
