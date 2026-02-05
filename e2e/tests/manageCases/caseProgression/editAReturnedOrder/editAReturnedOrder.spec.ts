import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import {
    OrderTypes,
  solicitorCaseCreateType,
  JudgeOrMagistrateTitles,
} from "../../../../common/types.js";
import { DraftAnOrder4Params } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder4.po.js";
import { OrderInformation } from "../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { ParentalResponsibilityOrderScenarios } from "../../../../testData/draftOrders.ts";
import { EditAndApproveAnOrder } from "../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder.ts";
import { HearingDetailsParams } from "../../../../pageObjects/components/exui/orderHearingDetails.component.ts";

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

export interface ParentalResponsibilityDraftOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  draftAnOrder4Params: DraftAnOrder4Params;
  responsibleParentFullName: string;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

export interface DayMonthYear {
  day: string;
  month: string;
  year: string;
}

export interface EditReturnedOrder3Params {
  orderType: OrderTypes;
  isOrderByConsent: boolean;
  wasOrderApprovedAtAHearing: boolean;
  hearing?: string; // No hearings available is a valid hearing
  judgeOrMagistratesTitle?: JudgeOrMagistrateTitles;
  judgeFullName?: string;
  justicesLegalAdviserFullName?: string;
  dateOrderMade?: DayMonthYear; // this is autofilled to today's date
  isOrderAboutTheChildren?: boolean;
  isOrderAboutAllTheChildren?: boolean;
  allChildrenInOrder?: string[];
  recitalsAndPreamble?: string;
  directions?: string;
}

export interface EditReturnedOrder12PageParams {
  hasJudgeProvidedHearingDetails: boolean;
  hearingDetails?: HearingDetailsParams;
}

test.describe("Barrister user performing events for a CA case", () => {
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

    const draftOrderParams = ParentalResponsibilityOrderScenarios[0];
    
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
          //isDraftAnOrder: true, is it here? the exported parameters from other files?
    },
  ].forEach((data) => {
    test(`Barrister performing 'next steps' events for a CA case. @regression @accessibility @nightly @test`, async ({
      nocSolicitor,
      navigationUtils,
        barrister,
      browser,
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

      const editAndApproveAnOrder: EditAndApproveAnOrder = new EditAndApproveAnOrder();
      await navigationUtils.openNewBrowserWindow(browser, "barrister");
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
        await EditAndApproveAnOrder.editAndApproveAnOrder({
              page: page,
              caseType: "C100",
              orderType: "parentalResponsibility",
              judeOrderAction: "Ask the legal representative to make changes",
              errorMessaging: false,
              accessibilityTest: false,
              browser: browser,
              caseRef: caseNumber,
            });
     
      //add new pages here, then attempt to run them as a list, and if works, group in a new block to be resusable

      const { editAReturnedOrderEvent } =
        barrister;
      //go to case
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "summary",
      );
        //assign and use WA task
        await Helpers.assignTaskToMeAndTriggerNextSteps(
            page,
            `${orderTypesMap.get(orderType)}`, //this might fail? can be the task name directly?
            "Review and Approve Legal rep Order",
        );
      //perform edit and approva order event
      await editAReturnedOrderEvent.editReturnedOrder1Page.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrder1Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder1Page.selectOrder();
      await editAReturnedOrderEvent.editReturnedOrder1Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrder2Page.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrder2Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder2Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrder3Page.assertPageContents(caseType, orderType);
      await editAReturnedOrderEvent.editReturnedOrder3Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder3Page.fillInFields(caseType);

      await editAReturnedOrderEvent.editReturnedOrder12Page.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrder12Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder12Page.fillInFields(hasJudgeProvidedHearingDetails,
        hearingDetails);

      await editAReturnedOrderEvent.editReturnedOrder13Page.assertPageContents(orderType, caseNumber, pdfName, snapshotsPath);
      await editAReturnedOrderEvent.editReturnedOrder13Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder13Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.assertPageContents(
        orderParams.snapshotsPath,
        orderParams.snapshotName,
      );
      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.clickSaveAndContinue();

      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.clickCloseAndReturnToCaseDetails();


    });
  });
});