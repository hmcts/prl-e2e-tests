import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for CA case", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({
      browser,
      caseEventUtils,
      navigationUtils,
      amendApplicantDetails1,
      amendApplicantDetailsSubmit,
    }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
      // running Amend appl details event to allow Noc (if Noc gets fixed in the future, this bit can be removed)
      const caseworkerContext = await browser.newContext({
        storageState: config.sessionStoragePath + "caseWorker.json",
      });
      const caseworkerPage = await caseworkerContext.newPage();
      await amendApplicantDetails1.loginAsCaseworkerAndGoToEvent(
        caseworkerPage,
        caseNumber,
      );
      await amendApplicantDetails1.clickContinue(caseworkerPage);
      await amendApplicantDetailsSubmit.clickSaveAndContinue(caseworkerPage);
      await caseworkerContext.close();
    },
  );

  [
    {
      existingRepresentative: ["Legal Solicitor (John Doe)"],
      addBarristerSnapshotName: "c100-add-barrister",
      removeBarristerSnapshotName: "c100-remove-barrister",
      applicants: [{ firstname: "John", surname: "Doe" }],
      barrister: {
        firstnames: "BarristerOneFN",
        lastname: "BarristerOneLN",
        email: "hmcts.privatelaw+org2bar2@gmail.com",
        org: "PRL Barrister Org2",
      },
    },
  ].forEach(
    ({
      addBarristerSnapshotName,
      removeBarristerSnapshotName,
      applicants,
      barrister,
    }) => {
      test(`Solicitor adds and removes Barrister for a CA case. @regression @accessibility @nightly`, async ({
        summaryPage,
        c100Noc1Page,
        c100Noc2Page,
        c100NocSubmitPage,
        partiesPage,
        axeUtils,
        c100AdminAddBarrister1Page,
        c100AdminAddBarrister2Page,
        c100NocConfirmationPage,
        c100AdminRemoveBarrister1Page,
        c100AdminRemoveBarrister2Page,
      }) => {
        // adding solicitor via NoC to allow Barrister functionality
        await summaryPage.exuiHeader.clickNoticeOfChange();
        await c100Noc1Page.assertPageContents();
        await axeUtils.audit();
        await c100Noc1Page.fillInCaseNumber(caseNumber);
        await c100Noc1Page.clickContinue();
        await c100Noc2Page.assertPageContents();
        await axeUtils.audit();
        for (const partyName of applicants) {
          await c100Noc2Page.fillInPartyName(
            partyName.firstname,
            partyName.surname,
          );
        }
        await c100Noc2Page.clickContinue();
        await c100NocSubmitPage.checkBoxes();
        await c100NocSubmitPage.clickSubmit();
        await c100NocConfirmationPage.checkBoxes();
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
        );
        await c100AdminAddBarrister1Page.clickContinue();
        await c100AdminAddBarrister2Page.assertPageContents(
          addBarristerSnapshotName,
        );
        await axeUtils.audit();
        await c100AdminAddBarrister2Page.clickSubmit();
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
        await c100AdminRemoveBarrister1Page.selectPartyToRemoveBarrister();
        await c100AdminRemoveBarrister1Page.clickContinue();
        await c100AdminRemoveBarrister2Page.assertPageContents(
          removeBarristerSnapshotName,
        );
        await axeUtils.audit();
        await c100AdminRemoveBarrister2Page.clickSubmit();
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
