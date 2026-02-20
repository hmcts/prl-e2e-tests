import config from "../../../../utils/config.utils";
import { test, expect } from "../../../fixtures";

test.describe("Validating auto-generated case names for CA case", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
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
      resultingCaseName: { c100newCaseName: "UpdatedApplLN V Richards" },
      updatedRespondentsName: {
        firstname: "newRespndentFN",
        surname: "newRespndentLN",
      },
      resultingCaseNameRespondent: {
        c100newCaseNameRespondent: "UpdatedApplLN V newRespndentLN",
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
      await amendDetails.amendApplicantDetails1.c100updateApplicantsName(
        data.updatedApplicantsName.firstname,
        data.updatedApplicantsName.surname,
      );
      await amendDetails.amendApplicantDetails1.verifyAccessibility();
      await amendDetails.amendApplicantDetails1.clickContinue();
      await amendDetails.amendApplicantDetailsSubmit.clickSaveAndContinue();
      // checking if the 'case name' has been updated as expected
      await summaryPage.c100assertCaseNameAfterUpdate(
        data.resultingCaseName.c100newCaseName,
      );
      // checking Parties tab for name update
      await partiesPage.goToPage();
      await partiesPage.c100assertUpdatedApplName(
        data.updatedApplicantsName.surname,
      );
      // updating Respondent's name, and re-checking
      await partiesPage.chooseEventFromDropdown("Amend respondent details");
      await expect(
        amendDetails.amendRespondentDetails1.pageHeading,
      ).toBeVisible();
      await amendDetails.amendRespondentDetails1.c100updateRespondentsName(
        data.updatedRespondentsName.firstname,
        data.updatedRespondentsName.surname,
      );
      await amendDetails.amendRespondentDetails1.verifyAccessibility();
      await amendDetails.amendRespondentDetails1.clickContinue();
      await amendDetails.amendRespondentDetails1.verifyAccessibility();
      await amendDetails.amendRespondentDetailsSubmit.clickSaveAndContinue();
      // checking if the 'case name' has been updated as expected
      await summaryPage.c100assertCaseNameAfterUpdateRespondent(
        data.resultingCaseNameRespondent.c100newCaseNameRespondent,
      );
      // checking Parties tab for name update
      await partiesPage.goToPage();
      await partiesPage.c100assertUpdatedRespName(
        data.updatedRespondentsName.surname,
      );
    });
  });
});
