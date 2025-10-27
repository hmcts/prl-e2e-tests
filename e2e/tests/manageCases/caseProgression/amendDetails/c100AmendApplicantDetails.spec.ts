import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend applicant details event as a court admin for a CA case", () => {
  let caseNumber: string = "";

  test.beforeEach(async ({ caseEventUtils, browser, navigationUtils }) => {
    caseNumber = await caseEventUtils.createCACase(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "Summary",
    );
  });

  test(`Amend the following C100 applicant details, including: name, refuge document, date of birth, solicitor information @nightly @regression @accessibility`, async ({
    summaryPage,
    amendApplicantDetails1Page,
    amendApplicantDetailsSubmitPage,
    axeUtils,
    dateHelperUtils,
  }): Promise<void> => {
    await summaryPage.chooseEventFromDropdown("Amend applicant details");

    await amendApplicantDetails1Page.checkPageLoaded();
    await axeUtils.audit();
    await amendApplicantDetails1Page.enterApplicantName(
      "Minnie",
      "Doe",
      "Mouse",
    );
    const [day, month, year] = dateHelperUtils.generateDOB(false);
    await amendApplicantDetails1Page.enterDateOfBirth(day, month, year);
    await amendApplicantDetails1Page.selectGender("female");
    await amendApplicantDetails1Page.selectRefugeAndUpload();
    await amendApplicantDetails1Page.setConfidentialDetails("test@example.com");
    await amendApplicantDetails1Page.fillSolicitorDetails(
      "SolicitorCA",
      "TestCA",
      "solicitorCA@test.com",
      "07123456789",
      "ref123",
      "SW1A 0AA",
    );
    await amendApplicantDetails1Page.clickContinue();

    await amendApplicantDetailsSubmitPage.checkPageLoaded();
    await amendApplicantDetailsSubmitPage.checkCYASnapshot();
    // await axeUtils.audit(); //failing - #TODO run accessibility test once EXUI-2726 ticket is fixed
    await amendApplicantDetailsSubmitPage.clickSaveAndContinue();

    await summaryPage.alertBanner.assertEventAlert(
      caseNumber,
      "Amend applicant details",
    );
  });
});
