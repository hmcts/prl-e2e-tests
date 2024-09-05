import { test } from "@playwright/test";
import { SolicitorCreateInitial } from "../../../journeys/manageCases/createCase/solicitorCreateInitial";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test("Create a C100 case. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase(
      page,
      "solicitor",
      false,
      "C100",
      false,
    );
  });

  test("Create a FL401 case. Type Of Application Not Linked To C100. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await FL401.fl401(
      page,
      "solicitor",
      false,
      "FL401",
      false,
      false,
    )
  });

  test("Check the errors of a C100 solicitor create journey. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase(
      page,
      "solicitor",
      false,
      "C100",
      true,
    );
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
  await SolicitorCreateInitial.createInitialCase(
    page,
    "solicitor",
    true,
    "C100",
    false,
  );
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
