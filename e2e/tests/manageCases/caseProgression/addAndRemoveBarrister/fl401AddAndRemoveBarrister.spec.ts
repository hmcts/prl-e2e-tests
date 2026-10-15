import config from "../../../../utils/config.utils.ts";
import { NocSolicitorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/nocSolicitorPages.ts";
import { test, expect } from "../../../fixtures.ts";

interface PartyName {
  firstname: string;
  surname: string;
}

async function performNoticeOfChange(
  nocSolicitor: NocSolicitorPagesGroup,
  caseNumber: string,
  nocParty: PartyName,
): Promise<void> {
  const { summaryPage, noticeOfChange } = nocSolicitor;

  await summaryPage.exuiHeader.clickNoticeOfChange();
  await noticeOfChange.page1.assertPageContents();
  await noticeOfChange.page1.verifyAccessibility();
  await noticeOfChange.page1.fillInCaseNumber(caseNumber);
  await noticeOfChange.page1.clickContinue();
  await noticeOfChange.page2.assertPageContents();
  await noticeOfChange.page2.verifyAccessibility();
  await noticeOfChange.page2.fillInPartyName(
    nocParty.firstname,
    nocParty.surname,
  );
  await noticeOfChange.page2.clickContinue();
  await noticeOfChange.submitPage.assertPageContents();
  await noticeOfChange.submitPage.verifyAccessibility();
  await noticeOfChange.submitPage.checkBoxes();
  await noticeOfChange.submitPage.clickSubmit();
  await noticeOfChange.confirmPage.assertPageContents();
  await noticeOfChange.confirmPage.verifyAccessibility();
  await noticeOfChange.confirmPage.clickViewThisCase();
}

test.describe("Add/Remove Barrister for DA case", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");

      const { page, summaryPage, amendDetails } = caseWorker;
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
      );

      // Workaround to update the organisation policy so notice of change succeeds.
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
      nocParty: { firstname: "Elise", surname: "Lynn" },
      barrister: {
        firstnames: "BarristerOneFN",
        lastname: "BarristerOneLN",
        email: "hmcts.privatelaw+org2bar2@gmail.com",
        org: "PRL Barrister Org2",
      },
    },
  ].forEach((data) => {
    test("Solicitor adds and removes Barrister for a DA case. @nightly @accessibility @regression", async ({
      nocSolicitor,
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      const {
        page: solicitorPage,
        summaryPage: solicitorSummaryPage,
        manageBarrister: solicitorManageBarrister,
      } = nocSolicitor;

      await navigationUtils.goToCase(
        solicitorPage,
        config.manageCasesBaseURLCase,
        caseRef,
        "summary",
      );
      await performNoticeOfChange(nocSolicitor, caseRef, data.nocParty);
      await navigationUtils.goToCase(
        solicitorPage,
        config.manageCasesBaseURLCase,
        caseRef,
      );

      await solicitorSummaryPage.chooseEventFromDropdown("Add barrister");
      await solicitorManageBarrister.addBarrister1Page.assertPageContents();
      await solicitorManageBarrister.addBarrister1Page.verifyAccessibility();
      await solicitorManageBarrister.addBarrister1Page.selectPartyAndFillInBarristerDetails(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
      );
      await solicitorManageBarrister.addBarrister1Page.clickContinue();
      await solicitorManageBarrister.addBarristerSubmit.assertPageContents();
      // Accessibility issue on the Add barrister CYA page: EXUI-2726.
      await solicitorManageBarrister.addBarristerSubmit.clickSubmit();
      await solicitorSummaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Add barrister",
      );

      const { page, summaryPage, manageBarrister, partiesPage } = caseWorker;
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
      await partiesPage.goToPage();
      await partiesPage.assertFl401BarristerDetailsPresent(
        data.barrister.org,
        false,
      );

      await summaryPage.chooseEventFromDropdown("Remove barrister");
      await manageBarrister.removeBarrister1Page.assertPageContents();
      await manageBarrister.removeBarrister1Page.verifyAccessibility();
      await manageBarrister.removeBarrister1Page.selectPartyToRemoveBarrister();
      await manageBarrister.removeBarrister1Page.clickContinue();
      await manageBarrister.removeBarristerSubmit.assertPageContents();
      await manageBarrister.removeBarristerSubmit.verifyAccessibility();
      await manageBarrister.removeBarristerSubmit.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Remove barrister",
      );

      await partiesPage.goToPage();
      await partiesPage.assertFl401BarristerDetailsRemoved(data.barrister.org);
    });

    test("Caseworker adds and removes Barrister for a DA case. @nightly @accessibility @regression", async ({
      nocSolicitor,
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      await navigationUtils.goToCase(
        nocSolicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "summary",
      );
      await performNoticeOfChange(nocSolicitor, caseRef, data.nocParty);

      const { page, summaryPage, manageBarrister, partiesPage } = caseWorker;
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
      );

      await summaryPage.chooseEventFromDropdown("Add barrister");
      await manageBarrister.addBarrister1Page.assertPageContents();
      await manageBarrister.addBarrister1Page.verifyAccessibility();
      await manageBarrister.addBarrister1Page.selectPartyAndFillInBarristerDetails(
        data.barrister.firstnames,
        data.barrister.lastname,
        data.barrister.email,
        data.barrister.org,
      );
      await manageBarrister.addBarrister1Page.clickContinue();
      await manageBarrister.addBarristerSubmit.assertPageContents();
      // Accessibility issue on the Add barrister CYA page: EXUI-2726.
      await manageBarrister.addBarristerSubmit.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(caseRef, "Add barrister");

      await partiesPage.goToPage();
      await partiesPage.assertFl401BarristerDetailsPresent(
        data.barrister.org,
        true,
      );

      await summaryPage.chooseEventFromDropdown("Remove barrister");
      await manageBarrister.removeBarrister1Page.assertPageContents();
      await manageBarrister.removeBarrister1Page.verifyAccessibility();
      await manageBarrister.removeBarrister1Page.selectPartyToRemoveBarrister();
      await manageBarrister.removeBarrister1Page.clickContinue();
      await manageBarrister.removeBarristerSubmit.assertPageContents();
      await manageBarrister.removeBarristerSubmit.verifyAccessibility();
      await manageBarrister.removeBarristerSubmit.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Remove barrister",
      );

      await partiesPage.goToPage();
      await partiesPage.assertFl401BarristerDetailsRemoved(data.barrister.org);
    });
  });
});
