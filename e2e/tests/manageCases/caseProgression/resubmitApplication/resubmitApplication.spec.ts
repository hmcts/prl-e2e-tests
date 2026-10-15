import Config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.describe(`Resubmit returned C100 application tests`, (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;

      await manageCasesEventUtils.returnApplication(
        caseRef,
        "C100",
        "applicationIncomplete",
      );

      await navigationUtils.goToCase(
        solicitor.page,
        Config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test(`Resubmit returned application @nightly @accessibility @regression`, async ({
    solicitor,
  }): Promise<void> => {
    const { tasksPage, resubmitApplication, summaryPage } = solicitor;

    await tasksPage.chooseEventFromDropdown("Submit");

    await resubmitApplication.c100Page1.assertPageContents();
    await resubmitApplication.c100Page1.verifyAccessibility();
    await resubmitApplication.c100Page1.confirmConfidentialityChecked();
    await resubmitApplication.c100Page1.clickContinue();

    await resubmitApplication.c100Page2.assertPageContents();
    await resubmitApplication.c100Page2.verifyAccessibility();
    await resubmitApplication.c100Page2.checkAgreeWithStatement();
    await resubmitApplication.c100Page2.clickSubmit();

    await summaryPage.alertBanner.assertEventAlert(caseRef, "Submit");

    await summaryPage.assertCaseStatus("Submitted");
  });
});

test.describe(`Resubmit returned FL401 application tests`, (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;

      await manageCasesEventUtils.returnApplication(
        caseRef,
        "FL401",
        "applicationIncomplete",
      );

      await navigationUtils.goToCase(
        solicitor.page,
        Config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test(`Resubmit returned application @nightly @accessibility @regression`, async ({
    solicitor,
  }): Promise<void> => {
    const { tasksPage, resubmitApplication, summaryPage } = solicitor;

    await tasksPage.chooseEventFromDropdown("Statement of Truth and submit");

    await resubmitApplication.fl401Page1.assertPageContents();
    await resubmitApplication.fl401Page1.verifyAccessibility();
    await resubmitApplication.fl401Page1.fillInFields(
      "Test Name",
      "Test Firm Name",
      "Test Position",
    );
    await resubmitApplication.fl401Page1.clickContinue();

    await resubmitApplication.fl401Page2.assertPageContents();
    await resubmitApplication.fl401Page2.verifyAccessibility();
    await resubmitApplication.fl401Page2.confirmCheckedApplication();
    await resubmitApplication.fl401Page2.clickSaveAndContinue();

    await summaryPage.alertBanner.assertEventAlert(
      caseRef,
      "Statement of Truth and submit",
    );

    await summaryPage.assertCaseStatus("Submitted");
  });
});
