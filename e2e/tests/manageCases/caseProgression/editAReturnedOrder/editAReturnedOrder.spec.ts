import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { EditAndApproveAnOrder } from "../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder.ts";
import { EditReturnedOrder3Params } from "../../../../pageObjects/pages/exui/editReturnedOrder/editReturnedOrder3.po.ts";
import { EditReturnedOrder12PageParams } from "../../../../pageObjects/pages/exui/editReturnedOrder/editReturnedOrder12.po.ts";
import { barristerInfo } from "../../../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminAddBarrister1.po.ts";
import { ChildArrangementsEditAReturnedOrderScenarios } from "../../../../testData/editAReturnedOrder.ts";
import { nocPartyInfo } from "../../../../pageObjects/pages/exui/noticeOfChange/c100Noc2Page.po.ts";
import { OrderTypes } from "../../../../common/types.ts";

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

export interface DayMonthYear {
  day: string;
  month: string;
  year: string;
}

export interface ChildArrangementsEditAReturnedOrderParams {
  orderType: OrderTypes;
  existingRepresentative: string[];
  existingRepresentativeRemoval: string[];
  addBarristerSnapshotName: string;
  removeBarristerSnapshotName: string;
  nocParty: nocPartyInfo;
  barrister: barristerInfo;
  editReturnedOrder3Params: EditReturnedOrder3Params;
  editReturnedOrder12PageParams: EditReturnedOrder12PageParams;
  snapshotName: string;
  snapshotsPath: string[];
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
    
  ChildArrangementsEditAReturnedOrderScenarios.forEach(
    (editAReturnedOrderParams: ChildArrangementsEditAReturnedOrderParams) => {
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
      await performNoticeOfChange(nocSolicitor, caseNumber, editAReturnedOrderParams.nocParty);
      // adding barrister
      await summaryPage.chooseEventFromDropdown("Add barrister");
      await manageBarristerC100.addBarrister1Page.assertPageContents();
      await manageBarristerC100.addBarrister1Page.verifyAccessibility();
      await manageBarristerC100.addBarrister1Page.selectPartyAndFillInBarristerDetails(
        editAReturnedOrderParams.barrister.firstnames,
        editAReturnedOrderParams.barrister.lastname,
        editAReturnedOrderParams.barrister.email,
        editAReturnedOrderParams.barrister.org,
        editAReturnedOrderParams.existingRepresentative,
      );
      await manageBarristerC100.addBarrister1Page.clickContinue();
      await manageBarristerC100.addBarristerSubmit.assertPageContents(
        ["caseProgression", "addBarrister"],
        editAReturnedOrderParams.addBarristerSnapshotName,
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
        editAReturnedOrderParams.barrister.firstnames,
        editAReturnedOrderParams.barrister.lastname,
        editAReturnedOrderParams.barrister.email,
        editAReturnedOrderParams.barrister.org,
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
      
      // starting 'Edit a returned order' event

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
        // await Helpers.assignTaskToMeAndTriggerNextSteps(
        //     page,
        //   `${orderTypesMap.get(orderType)}`, //this might fail? can be the task name directly?
        //   "Review and Approve Legal rep Order",
        // );
      //perform edit and approva order event
      await editAReturnedOrderEvent.editReturnedOrder1Page.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrder1Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder1Page.selectOrder();
      await editAReturnedOrderEvent.editReturnedOrder1Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrder2Page.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrder2Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder2Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrder3Page.assertPageContents("C100", editAReturnedOrderParams.orderType);
      await editAReturnedOrderEvent.editReturnedOrder3Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder3Page.fillInFields("C100", editAReturnedOrderParams.editReturnedOrder3Params);

      await editAReturnedOrderEvent.editReturnedOrder12Page.assertPageContents(editAReturnedOrderParams.orderType);
      await editAReturnedOrderEvent.editReturnedOrder12Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder12Page.fillInFields(editAReturnedOrderParams.editReturnedOrder12PageParams); 

      await editAReturnedOrderEvent.editReturnedOrder13Page.assertPageContents(editAReturnedOrderParams.orderType, caseNumber, editAReturnedOrderParams.snapshotName, editAReturnedOrderParams.snapshotsPath);
      await editAReturnedOrderEvent.editReturnedOrder13Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder13Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.assertPageContents(
        editAReturnedOrderParams.snapshotsPath,
        editAReturnedOrderParams.snapshotName,
      );
      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.clickSaveAndContinue();

      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.clickCloseAndReturnToCaseDetails();

    });
  });
});