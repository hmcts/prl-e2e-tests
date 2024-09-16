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
      "Respondent Details All Options: No " +
      "Would you like to give notice to the respondent: No " +
      "@crossbrowserManageCases",
    async ({ page }): Promise<void> => {
      await FL401.fl401(
        page,
        "solicitor",
        false,
        false,
        false,
        false,
        false,
        "No",
      );
    },
  );

  test(
    "Create a FL401 case with the following options: " +
      "Type of Application: Check All Boxes, " +
      "Is this linked to a C100 Application: Yes " +
      "Would you like to give notice to the respondent: Yes " +
      "Respondent Details All Options: Yes " +
      "Is respondent subject to any bail conditions: Yes " +
      "@crossbrowserManageCases",
    async ({ page }): Promise<void> => {
      await FL401.fl401(
        page,
        "solicitor",
        false,
        false,
        true,
        true,
        true,
        "Yes",
      );
    },
  );

  test(
    "Create a FL401 case with the following options: " +
      "Type of Application: Check All Boxes, " +
      "Is this linked to a C100 Application: Yes " +
      "Respondent Details All Options: Yes " +
      "Would you like to give notice to the respondent: Yes " +
      "Is respondent subject to any bail conditions: Don't Know " +
      "@crossbrowserManageCases",
    async ({ page }): Promise<void> => {
      await FL401.fl401(
        page,
        "solicitor",
        false,
        false,
        true,
        true,
        true,
        "Don't know",
      );
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
    await FL401.fl401(page, "solicitor", false, true, true, true, true, "Yes"); // <- page, user, accessibilityTest, errorMessaging, isLinkedToC100, allOptionsYes
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
  await FL401.fl401(page, "solicitor", true, false, true, true, true, "Yes"); // <- page, user, accessibilityTest, errorMessaging, isLinkedToC100, allOptionsYes
});
