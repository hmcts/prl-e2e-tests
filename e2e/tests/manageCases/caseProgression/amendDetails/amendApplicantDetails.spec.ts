import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Complete amend applicant details event as a court admin", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(`Amend the following applicant details: name, date of birth, gender,
  live in a refuge: yes,
  whether to keep details confidential: yes to all.
  Accessibility testing: Yes. @nightly @regression @accessibility`, async ({
    axeUtils,
    amendApplicantDetails2Page,
    amendApplicantDetailsSubmitPage,
    summaryPage,
    dateHelperUtils,
  }): Promise<void> => {
    //set test data
    const applicantInfo = {
      first: "John",
      last: "Doe",
      previous: "John Smith",
      gender: "male",
    };
    const [dobChangeDay, dobChangeMonth, dobChangeYear] =
      dateHelperUtils.generateDOB(false);
    const emailInput = `test@test.com`;
    const solicitorInfo = {
      first: "Jane",
      last: "Smith",
      email: "solicitor@test.com",
      phone: "07123456789",
      ref: "123",
      posstcode: "SW1H 9AJ",
    };

    //start test steps
    await summaryPage.chooseEventFromDropdown("Amend applicant details");
    await amendApplicantDetails2Page.checkPageLoaded();
    await amendApplicantDetails2Page.enterApplicantName(
      applicantInfo.first,
      applicantInfo.last,
      applicantInfo.previous,
    );
    await amendApplicantDetails2Page.enterDateOfBirth(
      dobChangeDay,
      dobChangeMonth,
      dobChangeYear,
    );
    await amendApplicantDetails2Page.selectGender(applicantInfo.gender);
    await amendApplicantDetails2Page.selectRefugeAndUpload();
    await amendApplicantDetails2Page.setConfidentialDetails(emailInput);
    await amendApplicantDetails2Page.fillSolicitorDetails(
      solicitorInfo.first,
      solicitorInfo.last,
      solicitorInfo.email,
      solicitorInfo.phone,
      solicitorInfo.ref,
      solicitorInfo.posstcode,
    );
    await axeUtils.audit();
    await amendApplicantDetails2Page.clickContinue();

    await amendApplicantDetailsSubmitPage.checkPageLoaded();
    await amendApplicantDetailsSubmitPage.checkApplicantName(
      applicantInfo.first,
      applicantInfo.last,
      applicantInfo.previous,
    );
    await amendApplicantDetailsSubmitPage.checkDateOfBirth(
      dobChangeDay,
      dobChangeMonth,
      dobChangeYear,
    );
    await amendApplicantDetailsSubmitPage.checkGender(applicantInfo.gender);
    await amendApplicantDetailsSubmitPage.checkRefugeAndUpload();
    await amendApplicantDetailsSubmitPage.checkConfidentialDetails(emailInput);
    await amendApplicantDetailsSubmitPage.checkSolicitorDetails(
      solicitorInfo.first,
      solicitorInfo.last,
      solicitorInfo.email,
      solicitorInfo.phone,
      solicitorInfo.ref,
    );
  });
});
