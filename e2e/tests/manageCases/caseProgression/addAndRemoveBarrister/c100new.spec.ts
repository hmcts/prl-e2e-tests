import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Page, Browser } from "@playwright/test";
import { C100AdminAddBarrister1Page } from "../../../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminAddBarrister1.po.ts";

test.use({ storageState: config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for CA case", () => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createCACase(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "summary",
    );
  });
    
[
    {
        existingRepresentative: [
            "Legal Solicitor (John Doe)",
        ],
        snapshotName: "c100-add-barrister",
        applicants: [
            { firstname: "John", surname: "Doe" },
        ],
        barrister: [
            { firstnames: "BarristerOneFN" },
            { lastname: "BarristerOneLN" },
            { email: "hmcts.privatelaw+org2bar2@gmail.com" },
            { org: "PRL Barrister Org2" },
        ]
    },
    ].forEach(({ existingRepresentative, snapshotName, applicants, barrister }) => {
        test(`Solicitor adds and removes Barrister for a CA case. @regression @accessibility @nightly`, async ({
            summaryPage,
            c100AmendApplicantDetails1ShortPage,
            c100AmendApplicantDetailsSubmitShortPage,
            applicationPage,
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
            // login as caseworker and 'amend applicant details' to allow NoC, close window
            //login? >>>>>>>
            await summaryPage.loginAsCaseworker(browser, caseNumber, page);
            await summaryPage.chooseEventFromDropdown("Amend applicant details");
            await c100AmendApplicantDetails1ShortPage.clickContinue();
            await c100AmendApplicantDetailsSubmitShortPage.clickSubmit();
            await summaryPage.endCaseworkerSession();
            // adding solicitor via NoC to allow Barrister functionality
            await page.getByRole("link", { name: "Notice of change" }).click();
            await c100Noc1Page.fillInCaseNumber(caseNumber);
            await c100Noc1Page.clickContinue();
            for (const partyName of applicants) {
                await c100Noc2Page.fillInPartyName(partyName.firstname, partyName.surname);
            }
            await c100Noc2Page.clickContinue();
            await c100NocSubmitPage.checkBoxes();
            await c100NocSubmitPage.clickSubmit();
            await c100NocConfirmationPage.checkBoxes();
            await applicationPage.assertC100ApplicantsSolicitorsDetailsPresent(applicants);
            // adding barrister
            await summaryPage.chooseEventFromDropdown("Add barrister");
            //await c100AdminAddBarrister1Page.assertPageContents();
            //await axeUtils.audit();
            for (const barristerDetails of barrister) {
                await c100AdminAddBarrister1Page.selectPartyAndFillInBarristerDetails(
                    barristerDetails.firstnames,
                    barristerDetails.lastname,
                    barristerDetails.email,
                    barristerDetails.org,
                );
            }
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
            await partiesPage.assertC100BarristerDetailsPresent(
                applicants,
            );
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
            // asseritng barrister is removed on Parties tab
            await partiesPage.goToPage();
            await partiesPage.assertC100BarristerDetailsRemoved(
                applicants,
            );
        });
    });
})