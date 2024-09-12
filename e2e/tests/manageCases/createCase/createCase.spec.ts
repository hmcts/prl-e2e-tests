import { test } from "@playwright/test";
import { C100 } from "../../../journeys/manageCases/createCase/C100";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test(
    "Create a C100 case with the following options:" +
      "Hearing urgency: yes to all values " +
      "@crossbrowserManageCases",
    async ({ page }): Promise<void> => {
      await C100.c100(page, "solicitor", false, false, true, true, "male");
    },
  );

  test(
    "Create a C100 case with the following options:" +
      "Hearing urgency: no to all values " +
      "@crossbrowserManageCases",
    async ({ page }): Promise<void> => {
      await C100.c100(page, "solicitor", false, false, false, false, "male");
    },
  );

  test(
    "Create a FL401 case with the following options: " +
      "Type of Application: Check All Boxes, " +
      "Is this linked to a C100 Application: No " +
      "@crossbrowserManageCases",
    async ({ page }): Promise<void> => {
      await FL401.fl401(page, "solicitor", false, false, false);
    },
  );

  test(
    "Create a FL401 case with the following options: " +
      "Type of Application: Check All Boxes, " +
      "Is this linked to a C100 Application: Yes " +
      "@crossbrowserManageCases",
    async ({ page }): Promise<void> => {
      await FL401.fl401(page, "solicitor", false, false, true);
    },
  );

  test("Check the errors of a C100 solicitor create journey. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await C100.c100(page, "solicitor", false, true, true, true, "female");
  });

  test("Check the errors of a FL401 solicitor create journey. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await FL401.fl401(page, "solicitor", false, true, true);
  });
});

test("Check the accessibility of a C100 solicitor create journey. @accessibilityManageCases", async ({
  page,
}): Promise<void> => {
  await C100.c100(page, "solicitor", true, false, true, true, "male");
});

test("Check the accessibility of a FL401 solicitor create journey. @accessibilityManageCases", async ({
  page,
}): Promise<void> => {
  await FL401.fl401(page, "solicitor", true, false, true);
});
