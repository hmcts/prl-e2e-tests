import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AmendApplicantDetails1 } from "../../../../pageObjects/pages/exui/amendApplicantDetails/amendApplicantDetails1.po.ts";
import { AmendApplicantDetailsSubmit } from "../../../../pageObjects/pages/exui/amendApplicantDetails/amendApplicantDetailsSubmit.po.ts";
import { PartiesPage } from "../../../../pageObjects/pages/exui/caseView/parties.po.ts";
import { SummaryPage } from "../../../../pageObjects/pages/exui/caseView/summary.po.ts";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage.ts";
// import { AmendRespondentDetails1 } from "../../../../pageObjects/pages/exui/amendRespondentDetails/amendRespondentDetails1.po.ts";
// import { AmendRespondentDetailsSubmit } from "../../../../pageObjects/pages/exui/amendRespondentDetails/amendRespondentDetailsSubmit.po.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("Validating auto-generated case names for CA and DA cases", () => {
  let caseNumber: string;
  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
      await console.log("The case ref is:", caseNumber); // TO BE REMOVED
    },
  );

  [
    {
      updatedApplicantsName: {
        firstname: "UpdatedApplFN",
        surname: "UpdatedApplLN",
      },
      resultingCaseName: { newCaseName: "UpdatedApplLN V Richards" },
      updatedRespondentsName: {
        firstname: "newRespndentFN",
        surname: "newRespndentLN",
      },
      resultingCaseNameRespondent: {
        newCaseNameRespondent: "UpdatedApplLN V newRespndentLN",
      },
    },
  ].forEach(
    ({
      updatedApplicantsName,
      resultingCaseName,
      // updatedRespondentsName,
      // resultingCaseNameRespondent,
    }) => {
      test(`Caseworker amends Applicant's name and the 'case name' is auto-updated. @regression @accessibility @nightly`, async ({
        browser,
      }): Promise<void> => {
        // logging in as Caseworker and updating the Applicant's name
        const caseworkerContext = await browser.newContext({
          storageState: config.sessionStoragePath + "caseWorker.json",
        });
        const caseworkerPage = await caseworkerContext.newPage();
        await Helpers.goToCase(
          caseworkerPage,
          config.manageCasesBaseURLCase,
          caseNumber,
          "tasks",
        );
        await Helpers.chooseEventFromDropdown(
          caseworkerPage,
          "Amend applicant details",
        );
        // Initiating new page object with the Caseworker context
        const amendApplicantDetails1 = new AmendApplicantDetails1(
          caseworkerPage,
        );
        const amendApplicantDetailsSubmit = new AmendApplicantDetailsSubmit(
          caseworkerPage,
        );
        await expect(amendApplicantDetails1.pageHeading).toBeVisible();
        await amendApplicantDetails1.updateApplicantsName(
          updatedApplicantsName.firstname,
          updatedApplicantsName.surname,
        );
        await amendApplicantDetails1.clickContinue();
        await amendApplicantDetailsSubmit.clickSaveAndContinue();
        // checking if the 'case name' has been updated as expected
        const newSummaryPage = new SummaryPage(caseworkerPage);
        await newSummaryPage.assertCaseNameAfterUpdate(
          resultingCaseName.newCaseName,
        );
        // checking Parties tab for name update
        const newPartiesPage = new PartiesPage(caseworkerPage);
        await newPartiesPage.goToPage();
        await newPartiesPage.assertUpdatedApplName(
          updatedApplicantsName.surname,
        );
        // checking 'case name' on the Case list screen
        const newCaseListPage = new CaseListPage();
        await newCaseListPage.assertNewCaseName(
          caseworkerPage,
          resultingCaseName.newCaseName,
        );
        // // updating Respondent's name, and re-checking
        // await Helpers.goToCase(
        //     caseworkerPage,
        //     config.manageCasesBaseURLCase,
        //     caseNumber,
        //     "tasks",
        // );
        // await Helpers.chooseEventFromDropdown(
        //     caseworkerPage,
        //     "Amend respondent details",
        // );
        // const amendRespondentDetails1 = new AmendRespondentDetails1(caseworkerPage);
        // const amendRespondentDetailsSubmit = new AmendRespondentDetailsSubmit(
        //     caseworkerPage,
        // );
        // await expect(amendRespondentDetails1.pageHeading).toBeVisible();
        // await amendRespondentDetails1.updateApplicantsName(
        //     updatedRespondentsName.firstname,
        //     updatedRespondentsName.surname,
        // );
        // await amendRespondentDetails1.clickContinue();
        // await amendRespondentDetailsSubmit.clickSaveAndContinue();

        // // checking if the 'case name' has been updated as expected
        // await newSummaryPage.assertCaseNameAfterUpdateRespondent(
        //     resultingCaseNameRespondent.newCaseNameRespondent,
        // );
        // // checking Parties tab for name update
        // await newPartiesPage.goToPage();
        // await newPartiesPage.assertUpdatedRespName(
        //     updatedRespondentsName.surname,
        // );
        // // checking 'case name' on the Case list screen
        // await newCaseListPage.assertNewCaseNameRespondent(
        //     caseworkerPage,
        //     resultingCaseNameRespondent.newCaseNameRespondent,
        // );
      });
    },
  );
});
