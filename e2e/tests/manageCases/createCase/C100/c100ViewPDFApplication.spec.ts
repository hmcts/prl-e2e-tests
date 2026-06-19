import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { C100ViewPDFApplication } from "../../../../journeys/manageCases/createCase/C100ViewPDFApplication/c100ViewPDFApplication.ts";

test.describe("C100 view PDF application tests", (): void => {
  let caseNumber: string;

  test.beforeEach(async ({ solicitor, caseEventUtils, navigationUtils }) => {
    await solicitor.page.goto(config.manageCasesBaseURLCase);
    caseNumber = await caseEventUtils.createTSSolicitorCase(
      solicitor.page,
      "C100",
    );
    await navigationUtils.goToCase(
      solicitor.page,
      config.manageCasesBaseURLCase,
      caseNumber,
      "Tasks",
    );
  });

  test(`Check draft PDF applications @regression @nightly @accessibility`, async ({
    solicitor,
    navigationUtils,
  }): Promise<void> => {
    await C100ViewPDFApplication.c100ViewPDFApplication({
      page: solicitor.page,
      navigationUtils: navigationUtils,
      caseNumber: caseNumber,
      accessibilityTest: true,
    });
  });
});
