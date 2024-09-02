import { test } from "@playwright/test";
import { SolicitorCreateInitial } from "../../../journeys/manageCases/createCase/solicitorCreateInitial";

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test("Create a C100 case. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase(
      page,
      "caseWorker",
      false,
      "C100",
      false,
    );
  });

  test("Create a FL401 case. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase(
      page,
      "caseWorker",
      false,
      "FL401",
      false,
    );
  });

  test("Check the errors of a C100 solicitor create journey. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase(
      page,
      "caseWorker",
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
      "caseWorker",
      false,
      "FL401",
      true,
    );
  });
});

test("Check the accessibility of a C100 solicitor create journey. @crossbrowserManageCases", async ({
  page,
}): Promise<void> => {
  await SolicitorCreateInitial.createInitialCase(
    page,
    "caseWorker",
    true,
    "C100",
    false,
  );
});

test("Check the accessibility of a FL401 solicitor create journey. @crossbrowserManageCases", async ({
  page,
}): Promise<void> => {
  await SolicitorCreateInitial.createInitialCase(
    page,
    "caseWorker",
    true,
    "FL401",
    false,
  );
});
