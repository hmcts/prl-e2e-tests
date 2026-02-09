import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders1Page.ts";
import { ManageOrders3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders3Page.ts";
import { ManageOrders8PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders8PageCA.ts";
import { ManageOrders24PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders24PageCA.ts";
import { ManageOrders26PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders26PageCA.ts";
import { C100DraftOrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100DraftOrdersTabPage.ts";
import { ManageOrders4Page } from "../../../../pageObjects/pages/exui/orders/manageOrders/manageOrders4.po.ts";
import  { ManageOrders5Page } from "../../../../pageObjects/pages/exui/orders/manageOrders/manageOrders5.po.ts";
import  { SubmitPage } from "../../../../pageObjects/pages/exui/orders/manageOrders/submitPage.po.ts";

interface C100ManageOrdersOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
  isUploadOrder: boolean;
  serveOrderNow: boolean;
  hasJudgeNameAndTitle: boolean;
  isCaseworker: boolean;
}

export class C100ManageOrdersUploadJourneyC21 {
  public static async c100ManageOrdersUploadJourneyC21({
    page,
    accessibilityTest,
    yesNoManageOrders,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
    isUploadOrder,
    serveOrderNow,
    hasJudgeNameAndTitle,
  }: C100ManageOrdersOptions): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Manage orders");

    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
      isUploadOrder,
    });

    await ManageOrders3Page.manageOrders3Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      uploadOrderC100Options,
      uploadOrderFL401Options,
      solicitorCaseCreateType,
    });

    const manageOrders4Page = new ManageOrders4Page(page, accessibilityTest, isUploadOrder);
    await manageOrders4Page.assertPageContentsToBeVisible();
    await manageOrders4Page.assertPageContentsToContainText();
    await manageOrders4Page.selectC21OrderOption("Blank order or directions (C21): application refused");
    await manageOrders4Page.clickContinue();

    const manageOrders5Page = new ManageOrders5Page(page, accessibilityTest, isUploadOrder, solicitorCaseCreateType);
    await manageOrders5Page.assertPageContentsToBeVisible();
    await manageOrders5Page.assertC21RadiosAreSelectable();
    await manageOrders5Page.fillOrderDetails({
      orderApprovedAtHearing: "Yes",
      hearingApprovedAt: "No hearings available",
      judgeTitle: "Her Honour Judge",
      judgeFullName: "Judge PC",
      legalAdviserFullName: "Legal Adviser PC",
      dateOrderMade: { day: "10", month: "10", year: "2025" },
      orderAboutAllChildren: "Yes",
      uploadOrder: true,
    });
    await manageOrders5Page.clickContinue();

    await ManageOrders24PageCA.manageOrders24PageCA({ page, accessibilityTest });
    await ManageOrders26PageCA.manageOrders26PageCA({ page, accessibilityTest, serveOrderNow });

    const submitPage = new SubmitPage(page, accessibilityTest);
    await submitPage.assertPageContentsToBeVisible();
    await submitPage.assertExpectedLabelValuesPresent();
    await submitPage.assertChangeLinksPresentForLabels();
    await submitPage.validateAccessibility();
    await submitPage.clickSubmit();

    await Helpers.clickTab(page, "Draft orders");
    await C100DraftOrdersTabPage.c100DraftOrdersTabPage(page, accessibilityTest, hasJudgeNameAndTitle);
  }
}