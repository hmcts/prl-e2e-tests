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
    amendApplicantDetails2Page,
    summaryPage
  }): Promise<void> => {
    await summaryPage.chooseEventFromDropdown( "Amend applicant details");
    await amendApplicantDetails2Page.checkPageLoaded();
    await amendApplicantDetails2Page.enterApplicantName(
      "John",
      "Doe",
      "John Smith",
    );
    const [dobChangeDay, dobChangeMonth, dobChangeYear] =
      Helpers.generateDOB(false);
    await amendApplicantDetails2Page.enterDateOfBirth(
      dobChangeDay,
      dobChangeMonth,
      dobChangeYear,
    );
    await amendApplicantDetails2Page.selectGender("female");
    await amendApplicantDetails2Page.selectRefugeAndUpload();
    await amendApplicantDetails2Page.setConfidentialDetails("test@test.com");
    await amendApplicantDetails2Page.fillSolicitorDetails(
      "Jane",
      "Smith",
      "solicitor@test.com",
      "07123456789",
      "123",
      "SW1H 9AJ",
    );
  });
});
