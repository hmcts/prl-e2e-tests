import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for CA case", () => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber =
      await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "summary",
    );
  });
  [
    {
      existingRepresentative: ["Legal Solicitor (John Doe)"],
      nocContent: {
        govUkHeadingL: "Notice of change",
        p: "You can use this notice of change (sometimes called a 'notice of acting') to get access to the digital case file in place of:",
        li1: "a client acting in person",
        li2: "a legal representative previously acting on your client's behalf",
        span: "Online case reference number",
        govUkHint:
          " This is a 16-digit number from MyHMCTS, for example 1111-2222-3333-4444",
      },
      nocContent2: {
        govUkHeadingL: "Enter your client's details",
        p: `You must enter the client details exactly as they're written on the case, including any mistakes. If the client's name is Smyth but it has been labelled \"Smith\", you should enter Smith. Please ensure that you are only performing a notice of change on behalf of the client that you are representing.`,
        formLabel1: "Your client's first name",
        formLabel2: "Your client's last name",
      },
      snapshotName: "c100-add-barrister",
      applicants: [{ firstname: "John", surname: "Doe" }],
      barrister: {
        firstnames: "BarristerOneFN",
        lastname: "BarristerOneLN",
        email: "hmcts.privatelaw+org2bar2@gmail.com",
        org: "PRL Barrister Org2",
      },
      addBarristerContent: {
        govUkHeadingL: "Add barrister",
        span1: "For which party do you want to add a barrister?",
        span2: "First names of the barrister",
        span3: "Last name of the barrister",
        span4: "Email address of the barrister",
        govUkHint:
          " You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address. ",
        govukDetailsText:
          " If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly. Remember that organisations can only register one office address. This means that the details could be slightly different from what you're expecting. Contact the solicitor directly if you have any concerns. ",
      },
      addBarristerContent2: {
        change: " Change ",
        checkYA: "Check your answers",
      },
      removeBarristerContent: {
        govUkHeadingL: "Remove barrister",
        spanRemove: "Select a party to remove a Barrister",
      },
      removeBarristerContent2: {
        change2: " Change ",
        checkYA2: "Check your answers",
      },
    },
  ].forEach(
    ({
      existingRepresentative,
      snapshotName,
      applicants,
      barrister,
      nocContent,
      nocContent2,
      addBarristerContent,
      addBarristerContent2,
      removeBarristerContent,
      removeBarristerContent2,
    }) => {
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
        const solicitorPage = page;
        const solicitorContext = page.context();
        const caseworkerContext = await browser.newContext({
          storageState: config.sessionStoragePath + "caseWorker.json",
        });
        const caseworkerPage = await caseworkerContext.newPage();
        await c100AmendApplicantDetails1ShortPage.loginAsCaseworkerAndGoToEvent(
          caseworkerPage,
          caseNumber,
        );
        await c100AmendApplicantDetails1ShortPage.clickContinue(caseworkerPage);
        await c100AmendApplicantDetails1ShortPage.clickSaveAndContinue(
          caseworkerPage,
        );
        await caseworkerContext.close();
        // adding solicitor via NoC to allow Barrister functionality
        await solicitorPage
          .getByRole("link", { name: "Notice of change" })
          .click();
        await c100Noc1Page.assertPageContents(
          nocContent.govUkHeadingL,
          nocContent.p,
          nocContent.li1,
          nocContent.li2,
          nocContent.span,
          nocContent.govUkHint,
        );
        await axeUtils.audit();
        await c100Noc1Page.fillInCaseNumber(caseNumber);
        await c100Noc1Page.clickContinue();
        await c100Noc2Page.assertPageContents(
          nocContent2.govUkHeadingL,
          nocContent2.p,
          nocContent2.formLabel1,
          nocContent2.formLabel2,
        );
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
        await expect(
          summaryPage.page.getByRole("link", { name: "Notice of change" }),
        ).toBeVisible();
        await summaryPage.chooseEventFromDropdown("Add barrister");
        await c100AdminAddBarrister1Page.assertPageContents(
          addBarristerContent.govUkHeadingL,
          addBarristerContent.span1,
          addBarristerContent.span2,
          addBarristerContent.span3,
          addBarristerContent.span4,
          addBarristerContent.govUkHint,
          addBarristerContent.govukDetailsText,
        );
        await axeUtils.audit();
        await c100AdminAddBarrister1Page.selectPartyAndFillInBarristerDetails(
          barrister.firstnames,
          barrister.lastname,
          barrister.email,
          barrister.org,
        );
        await c100AdminAddBarrister1Page.clickContinue();
        await c100AdminAddBarrister2Page.assertPageContents(
          addBarristerContent2.change,
          addBarristerContent2.checkYA,
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
        await expect(
          summaryPage.page.getByRole("link", { name: "Notice of change" }),
        ).toBeVisible();
        await summaryPage.chooseEventFromDropdown("Remove barrister");
        await c100AdminRemoveBarrister1Page.assertPageContents(
          removeBarristerContent.govUkHeadingL,
          removeBarristerContent.spanRemove,
        );
        await axeUtils.audit();
        await c100AdminRemoveBarrister1Page.selectPartyToRemoveBarrister();
        await c100AdminRemoveBarrister1Page.clickContinue();
        await c100AdminRemoveBarrister2Page.assertPageContents(
          removeBarristerContent2.change2,
          removeBarristerContent2.checkYA2,
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
