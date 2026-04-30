import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { FL401ViewPDFApplication } from "../../../../journeys/manageCases/createCase/FL401ViewPDFApplication/FL401ViewPDFApplication.ts";

test.describe("FL401 view PDF application tests", (): void => {
  let caseNumber: string;

  test.beforeEach(async ({ solicitor, caseEventUtils, navigationUtils }) => {
    await solicitor.page.goto(config.manageCasesBaseURLCase);
    caseNumber = await caseEventUtils.createTSSolicitorCase(
      solicitor.page,
      "FL401",
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
    await FL401ViewPDFApplication.fl401ViewPDFApplication({
      page: solicitor.page,
      navigationUtils: navigationUtils,
      caseNumber: caseNumber,
      accessibilityTest: true,
    });
  });
});
