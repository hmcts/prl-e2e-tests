import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AmendApplicantDetails1 } from "../../../../pageObjects/pages/exui/amendApplicantDetails/amendApplicantDetails1.po.ts";
import { AmendApplicantDetailsSubmit } from "../../../../pageObjects/pages/exui/amendApplicantDetails/amendApplicantDetailsSubmit.po.ts";

test.use({ storageState: config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for CA case", () => {
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
      // running Amend appl details event to allow Noc (if Noc gets fixed in the future, this bit can be removed)
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
      //Initiating new page object with the Caseworker context
      const amendApplicantDetails1 = new AmendApplicantDetails1(caseworkerPage);
      const amendApplicantDetailsSubmit = new AmendApplicantDetailsSubmit(
        caseworkerPage,
      );
      await expect(amendApplicantDetails1.pageHeading).toBeVisible();
      await amendApplicantDetails1.clickContinue();
      await amendApplicantDetailsSubmit.clickSaveAndContinue();
      await caseworkerPage.close();
    },
  );

  [
    {
      existingRepresentative: [
        "John Doe (Applicant), PRL NOC Respondent Solicitor 1, Private law NOC solution",
      ],
      existingRepresentativeRemoval: [
        "John Doe (Applicant), PRL NOC Respondent Solicitor 1, BarristerOneFN BarristerOneLN",
      ],
      addBarristerSnapshotName: "c100-add-barrister",
      removeBarristerSnapshotName: "c100-remove-barrister",
      applicants: [{ firstname: "John", surname: "Doe" }],
      nocParty: { firstname: "John", surname: "Doe" },
      barrister: {
        firstnames: "BarristerOneFN",
        lastname: "BarristerOneLN",
        email: "hmcts.privatelaw+org2bar2@gmail.com",
        org: "PRL Barrister Org2",
      },
    },
  ].forEach(
    ({
      existingRepresentative,
      existingRepresentativeRemoval,
      addBarristerSnapshotName,
      removeBarristerSnapshotName,
      applicants,
      barrister,
      nocParty,
    }) => {
      test(`Solicitor adds and removes Barrister for a CA case. @regression @accessibility @nightly`, async ({
        summaryPage,
        c100Noc1Page,
        c100Noc2Page,
        c100NocSubmitPage,
        partiesPage,
        axeUtils,
        c100AdminAddBarrister1Page,
        c100AdminAddBarristerSubmit,
        c100NocConfirmationPage,
        c100AdminRemoveBarrister1Page,
        c100AdminRemoveBarristerSubmit,
      }): Promise<void> => {
        // adding solicitor via NoC to allow Barrister functionality
        await summaryPage.exuiHeader.clickNoticeOfChange();
        await c100Noc1Page.assertPageContents();
        await axeUtils.audit();
        await c100Noc1Page.fillInCaseNumber(caseNumber);
        await c100Noc1Page.clickContinue();
        await c100Noc2Page.assertPageContents();
        await axeUtils.audit();
        await c100Noc2Page.fillInPartyName(
          nocParty.firstname,
          nocParty.surname,
        );
        await c100Noc2Page.clickContinue();
        await c100NocSubmitPage.assertPageContents();
        await axeUtils.audit();
        await c100NocSubmitPage.checkBoxes();
        await c100NocSubmitPage.clickSubmit();
        await c100NocConfirmationPage.assertPageContents();
        await axeUtils.audit();
        await c100NocConfirmationPage.clickViewThisCase();
        // adding barrister
        await summaryPage.chooseEventFromDropdown("Add barrister");
        await c100AdminAddBarrister1Page.assertPageContents();
        await axeUtils.audit();
        await c100AdminAddBarrister1Page.selectPartyAndFillInBarristerDetails(
          barrister.firstnames,
          barrister.lastname,
          barrister.email,
          barrister.org,
          existingRepresentative,
        );
        await c100AdminAddBarrister1Page.clickContinue();
        await c100AdminAddBarristerSubmit.assertPageContents(
          addBarristerSnapshotName,
        );
        // await axeUtils.audit(); Note: to remove this comment once FPVTL-1357 fix is deployed
        await c100AdminAddBarristerSubmit.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Add barrister",
        );
        // asserting barrister is added on Parties tab
        await partiesPage.goToPage();
        await partiesPage.assertC100BarristerDetailsPresent(
          barrister.firstnames,
          barrister.lastname,
          barrister.email,
          barrister.org,
        );
        // removing barrister
        await summaryPage.chooseEventFromDropdown("Remove barrister");
        await c100AdminRemoveBarrister1Page.assertPageContents();
        await axeUtils.audit();
        await c100AdminRemoveBarrister1Page.selectPartyToRemoveBarrister(
          existingRepresentativeRemoval,
        );
        await c100AdminRemoveBarrister1Page.clickContinue();
        await c100AdminRemoveBarristerSubmit.assertPageContents(
          removeBarristerSnapshotName,
        );
        await axeUtils.audit();
        await c100AdminRemoveBarristerSubmit.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Remove barrister",
        );
        // asserting barrister is removed on Parties tab
        await partiesPage.goToPage();
        await partiesPage.assertC100BarristerDetailsRemoved(applicants);
      });
    },
  );
});
