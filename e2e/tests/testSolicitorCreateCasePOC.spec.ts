import { test } from "@playwright/test";
import { createCaseAndCompleteCaseEvents } from "../common/createDASolicitorCaseHelper.ts";

test("Create solicitor case - statement of truth and submit", async ({
  browser,
}): Promise<void> => {
  await createCaseAndCompleteCaseEvents(
    browser,
    "fl401StatementOfTruthAndSubmit",
  );
});

test("Create solicitor case - gatekeeping", async ({
  browser,
}): Promise<void> => {
  await createCaseAndCompleteCaseEvents(browser, "fl401SendToGateKeeper");
});

test("Create solicitor case - service of application", async ({
  browser,
}): Promise<void> => {
  await createCaseAndCompleteCaseEvents(browser);
});
