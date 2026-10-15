import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { C100ViewPDFApplication } from "../../../../journeys/manageCases/createCase/C100ViewPDFApplication/c100ViewPDFApplication.ts";

test.describe("C100 view PDF application tests", (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.createDraftTSSolicitorCase("C100"))
        .caseRef;
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "Tasks",
      );
    },
  );

  test(`Check draft PDF applications @regression @nightly @accessibility`, async ({
    solicitor,
    navigationUtils,
  }): Promise<void> => {
    await C100ViewPDFApplication.c100ViewPDFApplication({
      page: solicitor.page,
      navigationUtils: navigationUtils,
      caseNumber: caseRef,
      accessibilityTest: true,
    });
  });
});
