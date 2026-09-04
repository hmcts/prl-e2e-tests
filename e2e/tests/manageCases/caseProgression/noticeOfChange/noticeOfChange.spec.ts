import { caseTypes } from "../../../../common/types.ts";
import config from "../../../../utils/config.utils.ts";
import { expect, test } from "../../../fixtures.ts";

const clientNames = {
  C100: {
    applicant: { firstname: "John", surname: "Doe" },
    respondent: { firstname: "Mary", surname: "Richards" },
  },
  FL401: {
    applicant: { firstname: "John", surname: "Smith" },
    respondent: { firstname: "Elise", surname: "Lynn" },
  },
} as const;

caseTypes.forEach((caseType) => {
  test.describe(`Notice of Change tests for ${caseType}`, () => {
    let caseRef: string;

    test.beforeEach(
      async ({
        caseWorker,
        nocSolicitor,
        manageCasesEventUtils,
        navigationUtils,
      }) => {
        caseRef = (await manageCasesEventUtils.submitTSSolicitorCase(caseType))
          .caseRef;

        if (caseType === "C100") {
          await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
        } else {
          await manageCasesEventUtils.sendToGatekeeper(caseRef, caseType);

          // FL401-specific organisation policy workaround
          const { page, summaryPage, amendDetails } = caseWorker;

          await navigationUtils.goToCase(
            page,
            config.manageCasesBaseURLCase,
            caseRef,
          );

          await summaryPage.chooseEventFromDropdown("Amend applicant details");
          await expect(
            amendDetails.amendApplicantDetails1.pageHeading,
          ).toBeVisible();
          await amendDetails.amendApplicantDetails1.clickContinue();
          await amendDetails.amendApplicantDetailsSubmit.clickSaveAndContinue();
          await summaryPage.alertBanner.assertEventAlert(
            caseRef,
            "Amend applicant details",
          );
        }

        await navigationUtils.goToCase(
          nocSolicitor.page,
          config.manageCasesBaseURLCase,
          caseRef,
        );
      },
    );

    test("NOC applicant. @regression", async ({
      nocSolicitor,
    }): Promise<void> => {
      const { summaryPage, noticeOfChange, applicationPage } = nocSolicitor;
      const clientName = clientNames[caseType].applicant;

      await summaryPage.exuiHeader.clickNoticeOfChange();

      await noticeOfChange.page1.assertPageContents();
      await noticeOfChange.page1.fillInCaseNumber(caseRef);
      await noticeOfChange.page1.clickContinue();

      await noticeOfChange.page2.assertPageContents();
      await noticeOfChange.page2.fillInPartyName(
        clientName.firstname,
        clientName.surname,
      );
      await noticeOfChange.page2.clickContinue();

      await noticeOfChange.submitPage.assertPageContents(clientName);
      await noticeOfChange.submitPage.checkBoxes();
      await noticeOfChange.submitPage.clickSubmit();

      await noticeOfChange.confirmPage.assertPageContents();
      await noticeOfChange.confirmPage.clickViewThisCase();

      await applicationPage.goToPage();
      await applicationPage.assertNocSolicitorRepresentsParty(
        caseType,
        "applicant",
        process.env.NOC_SOLICITOR_USERNAME as string,
      );
    });

    test("NOC respondent. @nightly @accessibility @regression", async ({
      nocSolicitor,
    }): Promise<void> => {
      const { summaryPage, noticeOfChange, applicationPage } = nocSolicitor;
      const clientName = clientNames[caseType].respondent;

      await summaryPage.exuiHeader.clickNoticeOfChange();

      await noticeOfChange.page1.assertPageContents();
      await noticeOfChange.page1.verifyAccessibility();
      await noticeOfChange.page1.fillInCaseNumber(caseRef);
      await noticeOfChange.page1.clickContinue();

      await noticeOfChange.page2.assertPageContents();
      await noticeOfChange.page2.verifyAccessibility();
      await noticeOfChange.page2.fillInPartyName(
        clientName.firstname,
        clientName.surname,
      );
      await noticeOfChange.page2.clickContinue();

      await noticeOfChange.submitPage.assertPageContents(clientName);
      await noticeOfChange.submitPage.verifyAccessibility();
      await noticeOfChange.submitPage.checkBoxes();
      await noticeOfChange.submitPage.clickSubmit();

      await noticeOfChange.confirmPage.assertPageContents();
      await noticeOfChange.confirmPage.verifyAccessibility();
      await noticeOfChange.confirmPage.clickViewThisCase();

      await applicationPage.goToPage();
      await applicationPage.assertNocSolicitorRepresentsParty(
        caseType,
        "respondent",
        process.env.NOC_SOLICITOR_USERNAME as string,
      );
    });
  });
});
