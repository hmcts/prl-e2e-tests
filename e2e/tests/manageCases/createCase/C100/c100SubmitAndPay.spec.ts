import config from "../../../../utils/config.utils.ts";
import { C100SubmitAndPay } from "../../../../journeys/manageCases/createCase/C100SubmitAndPay/C100SubmitAndPay.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Submit and Pay tests", (): void => {
  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    const caseRef = (
      await manageCasesEventUtils.createDraftTSSolicitorCase("C100")
    ).caseRef;
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test(`Complete the C100 Submit and Pay event as a solicitor. @accessibility @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100SubmitAndPay.c100SubmitAndPay({
      page: page,
      yesNoWelshLanguage: true,
      yesNoHelpWithFees: false, // Help with Fees is not yet available in Family Private Law digital service.
      accessibilityTest: true,
    });
  });
});
