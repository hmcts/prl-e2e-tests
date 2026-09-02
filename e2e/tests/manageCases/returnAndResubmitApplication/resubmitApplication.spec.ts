import Config from "../../../utils/config.utils.ts";
import { test } from "../../fixtures.ts";
import { caseTypes, solicitorCaseCreateType } from "../../../common/types.js";
import { BasicCaseData } from "../../../utils/manageCaseEvent.utils.js";
import { CourtAdminStokePagesGroup } from "../../../pageObjects/roleBasedGroupedPages/courtAdminStokePages.js";
import { SolicitorPagesGroup } from "../../../pageObjects/roleBasedGroupedPages/solicitorPages.js";

caseTypes.forEach((caseType) => {
  test.describe(`Resubmit returned application tests`, (): void => {
    let caseData: BasicCaseData;

    test.beforeEach(
      async ({
        solicitor,
        courtAdminStoke,
        manageCasesEventUtils,
        navigationUtils,
      }) => {
        caseData = await manageCasesEventUtils.submitTSSolicitorCase(caseType);
        await navigationUtils.goToCase(
          courtAdminStoke.page,
          Config.manageCasesBaseURLCase,
          caseData.caseRef,
        );

        await returnApplication(courtAdminStoke, caseData, caseType);

        await navigationUtils.goToCase(
          solicitor.page,
          Config.manageCasesBaseURLCase,
          caseData.caseRef,
        );
      },
    );

    test(`Resubmit returned ${caseType} application @nightly @accessibility @regression`, async ({
      solicitor,
    }): Promise<void> => {
      await resubmitApplication(caseType, caseData, solicitor);
    });
  });
});

// TODO: low-key just want to make this an API call and make a separate test for return application
async function returnApplication(
  courtAdminStoke: CourtAdminStokePagesGroup,
  caseData: BasicCaseData,
  caseType: solicitorCaseCreateType,
): Promise<void> {
  const rejectionReason: string = "Application incomplete";
  const { summaryPage, historyPage, partiesPage, returnApplication } =
    courtAdminStoke;

  // return application
  await summaryPage.chooseEventFromDropdown("Return application");

  await returnApplication.page1.assertPageContents(caseType);
  await returnApplication.page1.verifyAccessibility();
  await returnApplication.page1.selectRejectionReason(rejectionReason);
  await returnApplication.page1.clickContinue();

  await returnApplication.page2.assertPageContents(
    caseData.caseRef,
    caseData.caseName,
    rejectionReason,
    caseType,
  );
  await returnApplication.page2.verifyAccessibility();
  await returnApplication.page2.clickContinue();

  await returnApplication.submitPage.assertPageContents(
    // TODO: need to mask the information that could change in the screenshot
    ["caseProgression", "returnApplication"],
    `${caseType}-return-application`,
  );
  await returnApplication.submitPage.verifyAccessibility();
  await returnApplication.submitPage.clickSaveAndContinue();

  await partiesPage.alertBanner.assertEventAlert(
    caseData.caseRef,
    "Return application",
  );

  // check status is correct
  await historyPage.goToPage();
  await historyPage.verifyEventHistory("Return application", "Returned");
}

async function resubmitApplication(
  caseType: solicitorCaseCreateType,
  caseData: BasicCaseData,
  solicitor: SolicitorPagesGroup,
): Promise<void> {
  const { tasksPage, resubmitApplication, summaryPage } = solicitor;

  if (caseType === "C100") {
    await tasksPage.chooseEventFromDropdown("Submit");

    await resubmitApplication.c100Page1.assertPageContents();
    await resubmitApplication.c100Page1.verifyAccessibility();
    await resubmitApplication.c100Page1.confirmConfidentialityChecked();
    await resubmitApplication.c100Page1.clickContinue();

    await resubmitApplication.c100Page2.assertPageContents();
    await resubmitApplication.c100Page2.verifyAccessibility();
    await resubmitApplication.c100Page2.checkAgreeWithStatement();
    await resubmitApplication.c100Page2.clickSubmit();

    await summaryPage.alertBanner.assertEventAlert(caseData.caseRef, "Submit");
  } else {
    await tasksPage.chooseEventFromDropdown("Statement of Truth and submit");

    await resubmitApplication.fl401Page1.assertPageContents();
    await resubmitApplication.fl401Page1.verifyAccessibility();
    await resubmitApplication.fl401Page1.fillInFields("Test", "Test", "Test");
    await resubmitApplication.fl401Page1.clickContinue();

    await resubmitApplication.fl401Page2.assertPageContents();
    await resubmitApplication.fl401Page2.verifyAccessibility();
    await resubmitApplication.fl401Page2.confirmCheckedApplication();
    await resubmitApplication.fl401Page2.clickSaveAndContinue();

    await summaryPage.alertBanner.assertEventAlert(
      caseData.caseRef,
      "Statement of Truth and submit",
    );
  }

  await summaryPage.assertCaseStatus("Submitted");
}
