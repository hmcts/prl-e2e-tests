import { test } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { C100SubmitAndPay } from "../../../../journeys/manageCases/createCase/C100SubmitAndPay/C100SubmitAndPay.ts";
import { createTSSolicitorCase } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor_idam.json" });

test.describe("C100 Create case Submit and Pay tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.manageCasesBaseURLCase);
    const ccdRef = await createTSSolicitorCase(page, "C100");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
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
