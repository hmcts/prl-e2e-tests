import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";

test.describe("Validating auto-generated case names for DA case", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACaseSendToGatekeeper(browser);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      updatedApplicantsName: {
        firstname: "UpdatedApplFN",
        surname: "UpdatedApplLN",
      },
      resultingCaseName: {
        fl401newCaseName: "UpdatedApplFN UpdatedApplLN & Elise Lynn",
      },
      updatedRespondentsName: {
        firstname: "newRespndentFN",
        surname: "newRespndentLN",
      },
      resultingCaseNameRespondent: {
        fl401newCaseNameRespondent:
          "UpdatedApplFN UpdatedApplLN & newRespndentFN newRespndentLN",
      },
    },
  ].forEach((data) => {
    test(`Caseworker amends Applicant's name and the 'case name' is auto-updated. @regression @accessibility @nightly`, async ({
      caseWorker,
    }): Promise<void> => {
      // updating the Applicant's name
      const { amendDetails, summaryPage, partiesPage } = caseWorker;
      await summaryPage.chooseEventFromDropdown("Amend applicant details");
      await expect(
        amendDetails.amendApplicantDetails1.pageHeading,
      ).toBeVisible();
      await amendDetails.amendApplicantDetails1.fl401updateApplicantsName(
        data.updatedApplicantsName.firstname,
        data.updatedApplicantsName.surname,
      );
      await amendDetails.amendApplicantDetails1.verifyAccessibility();
      await amendDetails.amendApplicantDetails1.clickContinue();
      await amendDetails.amendApplicantDetailsSubmit.clickSaveAndContinue();
      // checking if the 'case name' has been updated as expected
      await summaryPage.fl401assertCaseNameAfterUpdate(
        data.resultingCaseName.fl401newCaseName,
      );
      // checking Parties tab for name update
      await partiesPage.goToPage();
      await partiesPage.fl401assertUpdatedApplName(
        data.updatedApplicantsName.surname,
      );
      // updating Respondent's name, and re-checking
      await partiesPage.chooseEventFromDropdown("Amend respondent details");
      await expect(
        amendDetails.amendRespondentDetails1.pageHeading,
      ).toBeVisible();
      await amendDetails.amendRespondentDetails1.fl401updateRespondentsName(
        data.updatedRespondentsName.firstname,
        data.updatedRespondentsName.surname,
      );
      await amendDetails.amendRespondentDetails1.verifyAccessibility();
      await amendDetails.amendRespondentDetails1.clickContinue();
      await amendDetails.amendRespondentDetails1.verifyAccessibility();
      await amendDetails.amendRespondentDetailsSubmit.clickSaveAndContinue();
      // checking if the 'case name' has been updated as expected
      await summaryPage.fl401assertCaseNameAfterUpdateRespondent(
        data.resultingCaseNameRespondent.fl401newCaseNameRespondent,
      );
      // checking Parties tab for name update
      await partiesPage.goToPage();
      await partiesPage.fl401assertUpdatedRespName(
        data.updatedRespondentsName.surname,
      );
    });
  });
});
