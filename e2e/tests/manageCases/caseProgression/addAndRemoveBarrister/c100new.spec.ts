import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for CA case", () => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "summary",
    );
  });
  [
      {
          existingRepresentative: ["Legal Solicitor (John Doe)"],
          snapshotName: "c100-add-barrister",
          applicants: [{ firstname: "John", surname: "Doe" }],
          barrister: {
              firstnames: "BarristerOneFN",
              lastname: "BarristerOneLN",
              email: "hmcts.privatelaw+org2bar2@gmail.com",
              org: "PRL Barrister Org2",
          },
      }
  ].forEach(
    ({ existingRepresentative, snapshotName, applicants, barrister }) => {
      test(`Solicitor adds and removes Barrister for a CA case. @regression @accessibility @nightly`, async ({
        summaryPage,
        c100AmendApplicantDetails1ShortPage,
        c100Noc1Page,
        c100Noc2Page,
        c100NocSubmitPage,
        partiesPage,
        axeUtils,
        page,
        c100AdminAddBarrister1Page,
        c100AdminAddBarrister2Page,
        c100NocConfirmationPage,
        browser,
        c100AdminRemoveBarrister1Page,
          c100AdminRemoveBarrister2Page,
      }) => {
        // login as caseworker and complete 'amend applicant details' to allow NoC
          const solicitorPage = page; // this comes from the test fixture
          const solicitorContext = page.context();
          const caseworkerContext = await browser.newContext({
              storageState: config.sessionStoragePath + "caseWorker.json",
          });
          const caseworkerPage = await caseworkerContext.newPage();
          await c100AmendApplicantDetails1ShortPage.loginAsCaseworkerAndGoToEvent(caseworkerPage, caseNumber);
          await c100AmendApplicantDetails1ShortPage.clickContinue(caseworkerPage);
          await c100AmendApplicantDetails1ShortPage.clickSaveAndContinue(caseworkerPage);
          await caseworkerContext.close();
        // adding solicitor via NoC to allow Barrister functionality
        await solicitorPage.getByRole("link", { name: "Notice of change" }).click();
        await c100Noc1Page.fillInCaseNumber(caseNumber);
        await c100Noc1Page.clickContinue();
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
        await expect(summaryPage.page.getByRole("link", { name: "Notice of change" })).toBeVisible();
        await summaryPage.chooseEventFromDropdown("Add barrister");
        //await c100AdminAddBarrister1Page.assertPageContents();
        //await axeUtils.audit();
          await c100AdminAddBarrister1Page.selectPartyAndFillInBarristerDetails(
            barrister.firstnames,
            barrister.lastname,
            barrister.email,
            barrister.org,
          );
        await c100AdminAddBarrister1Page.clickContinue();
        // await c100AdminAddBarrister2Page.assertPageContents();
        // await axeUtils.audit();
        await c100AdminAddBarrister2Page.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Add barrister",
        );
        // asserting barrister is added on Parties tab
        await partiesPage.goToPage();
        await partiesPage.assertC100BarristerDetailsPresent(applicants);
        // removing barrister
        await summaryPage.chooseEventFromDropdown("Remove barrister");
        //await c100AdminRemoveBarrister1Page.assertPageContents();
        //await axeUtils.audit();
        await c100AdminRemoveBarrister1Page.selectPartyToRemoveBarrister();
        await c100AdminRemoveBarrister1Page.clickContinue();
        //await c100AdminRemoveBarrister2Page.assertPageContents();
        //await axeUtils.audit();
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
