import { test } from "@playwright/test";
import { SolicitorCreateInitial } from "../../../journeys/manageCases/createCase/solicitorCreateInitial";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";
import { C100 } from "../../../journeys/manageCases/createCase/C100";

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test("Create a C100 case with the following options:" +
    "Hearing urgency: yes to all values " +
    "@crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await C100.c100(page, "solicitor", false, false, true);
  });

  test("Create a C100 case with the following options:" +
    "Hearing urgency: no to all values " +
    "@crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await C100.c100(page, "solicitor", false, false, false);
  });

  test("Create a FL401 case. Type Of Application Not Linked To C100. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await FL401.fl401(page, "solicitor", false, "FL401", false, false);
  });

  test("Create a FL401 case. Type Of Application Is Linked To C100. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await FL401.fl401(page, "solicitor", false, "FL401", false, true);
  });

  test("Check Errors when filling out FLl401 Type of Application. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await FL401.fl401(page, "solicitor", false, "FL401", true, false);
  });

  test("Check the errors of a C100 solicitor create journey. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await C100.c100(page, "solicitor", false, true, true);
  });

  test("Check the errors of a FL401 solicitor create journey. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase(
      page,
      "solicitor",
      false,
      "FL401",
      true,
    );
  });
});

test("Check the accessibility of a C100 solicitor create journey. @accessibilityManageCases", async ({
  page,
}): Promise<void> => {
  await C100.c100(page, "solicitor", true, false, true);
});

test("Check the accessibility of a FL401 solicitor create journey. @accessibilityManageCases", async ({
  page,
}): Promise<void> => {
  await SolicitorCreateInitial.createInitialCase(
    page,
    "solicitor",
    true,
    "FL401",
    false,
  );
});
