import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";

async function performNoticeOfChange(nocSolicitor, caseNumber, nocParty) {
  const { summaryPage, noticeOfChangeC100 } = nocSolicitor;

  await summaryPage.exuiHeader.clickNoticeOfChange();
  await noticeOfChangeC100.page1.assertPageContents();
  await noticeOfChangeC100.page1.verifyAccessibility();
  await noticeOfChangeC100.page1.fillInCaseNumber(caseNumber);
  await noticeOfChangeC100.page1.clickContinue();
  await noticeOfChangeC100.page2.assertPageContents();
  await noticeOfChangeC100.page2.verifyAccessibility();
  await noticeOfChangeC100.page2.fillInPartyName(
    nocParty.firstname,
    nocParty.surname,
  );
  await noticeOfChangeC100.page2.clickContinue();
  await noticeOfChangeC100.submitPage.assertPageContents();
  await noticeOfChangeC100.submitPage.verifyAccessibility();
  await noticeOfChangeC100.submitPage.checkBoxes();
  await noticeOfChangeC100.submitPage.clickSubmit();
  await noticeOfChangeC100.confirmPage.assertPageContents();
  await noticeOfChangeC100.confirmPage.verifyAccessibility();
  await noticeOfChangeC100.confirmPage.clickViewThisCase();
}

test.describe("Add/Remove Barrister for CA case", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ browser, caseEventUtils, navigationUtils, caseWorker }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);

      const { page, summaryPage, amendDetails } = caseWorker;
      // running Amend appl details event to allow Noc (if Noc gets fixed in the future, this bit can be removed)
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
      await summaryPage.chooseEventFromDropdown("Amend applicant details");
      await expect(
        amendDetails.amendApplicantDetails1.pageHeading,
      ).toBeVisible();
      await amendDetails.amendApplicantDetails1.clickContinue();
      await amendDetails.amendApplicantDetailsSubmit.clickSaveAndContinue();
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
    test(`Solicitor adds and removes Barrister for a CA case. @regression @accessibility @nightly @test`, async ({
      nocSolicitor,
      navigationUtils,
    }): Promise<void> => {
      const { page, summaryPage, manageBarristerC100, partiesPage } =
        nocSolicitor;

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
      await manageBarristerC100.addBarrister1Page.assertPageContents();
      await manageBarristerC100.addBarrister1Page.verifyAccessibility();
      await manageBarristerC100.addBarrister1Page.selectPartyAndFillInBarristerDetails(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
        data.existingRepresentative,
      );
      await manageBarristerC100.addBarrister1Page.clickContinue();
      await manageBarristerC100.addBarristerSubmit.assertPageContents(
        ["caseProgression", "addBarrister"],
        data.addBarristerSnapshotName,
      );
      // await c100AdminAddBarristerSubmit.verifyAccessibility(); Note: to remove this comment once FPVTL-1357 fix is deployed
      await manageBarristerC100.addBarristerSubmit.clickSubmit();
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
      await manageBarristerC100.removeBarrister1Page.assertPageContents();
      await manageBarristerC100.removeBarrister1Page.verifyAccessibility();
      await manageBarristerC100.removeBarrister1Page.selectPartyToRemoveBarrister(
        data.existingRepresentativeRemoval,
      );
      await manageBarristerC100.removeBarrister1Page.clickContinue();
      await manageBarristerC100.removeBarristerSubmit.assertPageContents(
        ["caseProgression", "removeBarrister"],
        data.removeBarristerSnapshotName,
      );
      await manageBarristerC100.removeBarristerSubmit.verifyAccessibility();
      await manageBarristerC100.removeBarristerSubmit.clickSubmit();
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
      const { summaryPage, manageBarristerC100, partiesPage } = caseWorker;

      // adding solicitor via NoC to allow Barrister functionality
      await navigationUtils.goToCase(
        nocSolicitor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
      await performNoticeOfChange(nocSolicitor, caseNumber, data.nocParty);

      //change to caseworker to add/remove barrister
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
      // adding barrister as a caseworker
      await summaryPage.chooseEventFromDropdown("Add barrister");
      await manageBarristerC100.addBarrister1Page.assertPageContents();
      await manageBarristerC100.addBarrister1Page.verifyAccessibility();
      await manageBarristerC100.addBarrister1Page.selectPartyAndFillInBarristerDetails(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
        data.existingRepresentative,
      );
      await manageBarristerC100.addBarrister1Page.clickContinue();
      await manageBarristerC100.addBarristerSubmit.assertPageContents(
        ["caseProgression", "addBarrister"],
        data.addBarristerSnapshotName,
      );
      // await manageBarrister.c100AdminAddBarristerSubmit.verifyAccessibility(); Note: to remove this comment once FPVTL-1357 fix is deployed
      await manageBarristerC100.addBarristerSubmit.clickSubmit();
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
      await manageBarristerC100.removeBarrister1Page.assertPageContents();
      await manageBarristerC100.removeBarrister1Page.verifyAccessibility();
      await manageBarristerC100.removeBarrister1Page.selectPartyToRemoveBarrister(
        data.existingRepresentativeRemoval,
      );
      await manageBarristerC100.removeBarrister1Page.clickContinue();
      await manageBarristerC100.removeBarristerSubmit.assertPageContents(
        ["caseProgression", "removeBarrister"],
        data.removeBarristerSnapshotName,
      );
      await manageBarristerC100.removeBarristerSubmit.verifyAccessibility();
      await manageBarristerC100.removeBarristerSubmit.clickSubmit();
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
