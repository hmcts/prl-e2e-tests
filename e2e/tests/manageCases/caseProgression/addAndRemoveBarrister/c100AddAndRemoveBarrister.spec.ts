import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures/fixtures.ts";

async function performNoticeOfChange(nocSolicitor, caseNumber, nocParty) {
  const {
    summaryPage,
    c100Noc1Page,
    c100Noc2Page,
    c100NocSubmitPage,
    c100NocConfirmationPage,
  } = nocSolicitor;

  await summaryPage.exuiHeader.clickNoticeOfChange();
  await c100Noc1Page.assertPageContents();
  await c100Noc1Page.verifyAccessibility();
  await c100Noc1Page.fillInCaseNumber(caseNumber);
  await c100Noc1Page.clickContinue();
  await c100Noc2Page.assertPageContents();
  await c100Noc2Page.verifyAccessibility();
  await c100Noc2Page.fillInPartyName(nocParty.firstname, nocParty.surname);
  await c100Noc2Page.clickContinue();
  await c100NocSubmitPage.assertPageContents();
  await c100NocSubmitPage.verifyAccessibility();
  await c100NocSubmitPage.checkBoxes();
  await c100NocSubmitPage.clickSubmit();
  await c100NocConfirmationPage.assertPageContents();
  await c100NocConfirmationPage.verifyAccessibility();
  await c100NocConfirmationPage.clickViewThisCase();
}

test.describe("Add/Remove Barrister for CA case", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ browser, caseEventUtils, navigationUtils, caseWorker }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);

      const {
        page,
        summaryPage,
        amendApplicantDetails1,
        amendApplicantDetailsSubmit,
      } = caseWorker;

      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
      // running Amend appl details event to allow Noc (if Noc gets fixed in the future, this bit can be removed)
      await summaryPage.chooseEventFromDropdown("Amend applicant details");
      await expect(amendApplicantDetails1.pageHeading).toBeVisible();
      await amendApplicantDetails1.clickContinue();
      await amendApplicantDetailsSubmit.clickSaveAndContinue();
      await page.close();
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
  ].forEach((data) => {
    test(`Solicitor adds and removes Barrister for a CA case. @regression @accessibility @nightly`, async ({
      nocSolicitor,
      navigationUtils,
    }): Promise<void> => {
      const {
        page,
        summaryPage,
        c100AdminAddBarrister1Page,
        c100AdminAddBarristerSubmit,
        partiesPage,
        c100AdminRemoveBarrister1Page,
        c100AdminRemoveBarristerSubmit,
      } = nocSolicitor;

      // adding solicitor via NoC to allow Barrister functionality
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
      await performNoticeOfChange(nocSolicitor, caseNumber, data.nocParty);
      // adding barrister
      await summaryPage.chooseEventFromDropdown("Add barrister");
      await c100AdminAddBarrister1Page.assertPageContents();
      await c100AdminAddBarrister1Page.verifyAccessibility();
      await c100AdminAddBarrister1Page.selectPartyAndFillInBarristerDetails(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
        data.existingRepresentative,
      );
      await c100AdminAddBarrister1Page.clickContinue();
      await c100AdminAddBarristerSubmit.assertPageContents(
        ["caseProgression", "addBarrister"],
        data.addBarristerSnapshotName,
      );
      // await c100AdminAddBarristerSubmit.verifyAccessibility(); Note: to remove this comment once FPVTL-1357 fix is deployed
      await c100AdminAddBarristerSubmit.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Add barrister",
      );
      // asserting barrister is added on Parties tab
      await partiesPage.goToPage();
      await partiesPage.assertC100BarristerDetailsPresent(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
      );
      // removing barrister
      await summaryPage.chooseEventFromDropdown("Remove barrister");
      await c100AdminRemoveBarrister1Page.assertPageContents();
      await c100AdminRemoveBarrister1Page.verifyAccessibility();
      await c100AdminRemoveBarrister1Page.selectPartyToRemoveBarrister(
        data.existingRepresentativeRemoval,
      );
      await c100AdminRemoveBarrister1Page.clickContinue();
      await c100AdminRemoveBarristerSubmit.assertPageContents(
        ["caseProgression", "removeBarrister"],
        data.removeBarristerSnapshotName,
      );
      await c100AdminRemoveBarristerSubmit.verifyAccessibility();
      await c100AdminRemoveBarristerSubmit.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Remove barrister",
      );
      // asserting barrister is removed on Parties tab
      await partiesPage.goToPage();
      await partiesPage.assertC100BarristerDetailsRemoved(data.applicants);
    });

    test(`Caseworker adds and removes Barrister for a CA case. @regression @accessibility @nightly`, async ({
      nocSolicitor,
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      const {
        page,
        summaryPage,
        c100AdminAddBarrister1Page,
        c100AdminAddBarristerSubmit,
        partiesPage,
        c100AdminRemoveBarrister1Page,
        c100AdminRemoveBarristerSubmit,
      } = caseWorker;

      // adding solicitor via NoC to allow Barrister functionality
      await performNoticeOfChange(nocSolicitor, caseNumber, data.nocParty);
      await nocSolicitor.page.close();

      //change to caseworker to add/remove barrister
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
      // adding barrister as a caseworker
      await summaryPage.chooseEventFromDropdown("Add barrister");
      await c100AdminAddBarrister1Page.assertPageContents();
      await c100AdminAddBarrister1Page.verifyAccessibility();
      await c100AdminAddBarrister1Page.selectPartyAndFillInBarristerDetails(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
        data.existingRepresentative,
      );
      await c100AdminAddBarrister1Page.clickContinue();
      await c100AdminAddBarristerSubmit.assertPageContents(
        ["caseProgression", "addBarrister"],
        data.addBarristerSnapshotName,
      );
      // await caseWorker.c100AdminAddBarristerSubmit.verifyAccessibility(); Note: to remove this comment once FPVTL-1357 fix is deployed
      await c100AdminAddBarristerSubmit.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Add barrister",
      );
      await partiesPage.goToPage();
      await partiesPage.assertC100BarristerDetailsPresent(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
      );
      await partiesPage.assertC100ApplicantsSolicitorsDetailsPresent(
        data.applicants,
      );
      // removing barrister
      await summaryPage.chooseEventFromDropdown("Remove barrister");
      await c100AdminRemoveBarrister1Page.assertPageContents();
      await c100AdminRemoveBarrister1Page.verifyAccessibility();
      await c100AdminRemoveBarrister1Page.selectPartyToRemoveBarrister(
        data.existingRepresentativeRemoval,
      );
      await c100AdminRemoveBarrister1Page.clickContinue();
      await c100AdminRemoveBarristerSubmit.assertPageContents(
        ["caseProgression", "removeBarrister"],
        data.removeBarristerSnapshotName,
      );
      await c100AdminRemoveBarristerSubmit.verifyAccessibility();
      await c100AdminRemoveBarristerSubmit.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Remove barrister",
      );
      // asserting barrister is removed on Parties tab
      await partiesPage.goToPage();
      await partiesPage.assertC100BarristerDetailsRemoved(data.applicants);
      await partiesPage.assertC100ApplicantsSolicitorsDetailsPresent(
        data.applicants,
      );
    });
  });
});