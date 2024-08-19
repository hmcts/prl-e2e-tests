import { test } from "@playwright/test";
import { ExampleJourney } from "../../../journeys/manageCases/exampleEvent/exampleJourney";

test.describe("Manage cases example tests. @manageCases", () => {
  test("Manage cases example test with event name and parameters. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await ExampleJourney.exampleJourney(page, "1");
  });
});
