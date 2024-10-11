import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100ApplicationCompletedForYou } from "../../../../journeys/citizen/createCase/C100ApplicationCompletedForYou";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("Create Citizen Application but choose to have legal representative fill it out for you. @citizen", (): void => {
  test("Application completed for you with the following options:" +
    "No error messaging." +
    "No accessibility Testing", async ({
    page,
  }): Promise<void> => {
    await C100ApplicationCompletedForYou.c100ApplicationCompletedForYou({
      page: page,
      accessibilityTest: false,
      errorMessaging: false
    });
  });

  test("Application completed for you with the following options:" +
    "Yes error messaging." +
    "No accessibility Testing", async ({
      page,
    }): Promise<void> => {
    await C100ApplicationCompletedForYou.c100ApplicationCompletedForYou({
      page: page,
      accessibilityTest: false,
      errorMessaging: true
    });
  });
});

test("Application completed for you with the following options:" +
  "No error messaging." +
  "Yes accessibility Testing", async ({
    page,
  }): Promise<void> => {
  await C100ApplicationCompletedForYou.c100ApplicationCompletedForYou({
    page: page,
    accessibilityTest: true,
    errorMessaging: false
  });
});
