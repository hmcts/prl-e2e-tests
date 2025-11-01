import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend applicant details event as a court admin for a DA case", () => {
  let caseNumber: string = "";

  test.beforeEach(async ({ caseEventUtils, browser, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "Summary",
    );
  });

  test(`Amend the following FL401 applicant details, including: name, refuge document, date of birth, solicitor information`, async ({
    summaryPage,
    amendApplicantDetails2Page,
    amendApplicantDetailsSubmitPage,
    axeUtils,
    dateHelperUtils,
  }): Promise<void> => {
    await summaryPage.chooseEventFromDropdown("Amend applicant details");

    await amendApplicantDetails2Page.checkPageLoaded();
    await axeUtils.audit();
    await amendApplicantDetails2Page.enterApplicantName("John", "Doe", "Smith");
    const [day, month, year] = dateHelperUtils.generateDOB(false);
    await amendApplicantDetails2Page.enterDateOfBirth(day, month, year);
    await amendApplicantDetails2Page.selectGender("male");
    await amendApplicantDetails2Page.selectRefugeAndUpload();
    await amendApplicantDetails2Page.setConfidentialDetails("test@example.com");
    await amendApplicantDetails2Page.fillSolicitorDetails(
      "Solicitor",
      "Test",
      "solicitor@test.com",
      "07123456789",
      "ref123",
      "SW1A 0AA",
    );
    await amendApplicantDetails2Page.clickContinue();

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
