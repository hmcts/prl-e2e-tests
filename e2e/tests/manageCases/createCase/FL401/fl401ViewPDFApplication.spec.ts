import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { FL401ViewPDFApplication } from "../../../../journeys/manageCases/createCase/FL401ViewPDFApplication/FL401ViewPDFApplication.ts";

test.describe("FL401 view PDF application tests", (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (
        await manageCasesEventUtils.createDraftTSSolicitorCase("FL401")
      ).caseRef;
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
    await FL401ViewPDFApplication.fl401ViewPDFApplication({
      page: solicitor.page,
      navigationUtils: navigationUtils,
      caseNumber: caseRef,
      accessibilityTest: true,
    });
  });
});
