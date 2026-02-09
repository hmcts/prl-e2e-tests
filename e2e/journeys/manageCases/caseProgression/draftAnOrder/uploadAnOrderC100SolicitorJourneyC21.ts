import { Page, Browser } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import Config from "../../../../utils/config.utils.ts";
import { DraftAnOrder1Page } from "../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder1Page.ts";
import { UploadDraftAnOrder3Page } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder3Page.ts";
import { UploadDraftAnOrder4Page } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder4Page.ts";
import { C100DraftOrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100DraftOrdersTabPage.ts";
import { UploadDraftAnOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrderSubmitPage.ts";
import { ManageOrders8PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders8PageCA.ts";
import { DraftAnOrder4PageC21 } from "../../../../pageObjects/pages/exui/orders/draftAnOrder/draftAnOrder4PageC21.po.ts";
import { DraftAnOrder5PageC21 } from "../../../../pageObjects/pages/exui/orders/draftAnOrder/draftAnOrder5PageC21.po.ts";
import { SubmitPageC21 } from "../../../../pageObjects/pages/exui/orders/draftAnOrder/submitPageC21.po.ts";

interface C100DraftAnOrderOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
  errorMessaging: boolean;
  isUploadOrder: boolean;
  browser: Browser;
  caseRef: string;
  hasJudgeNameAndTitle: boolean;
  isCaseworker: boolean;
}

export class UploadAnOrderC100SolicitorJourneyC21 {
  public static async uploadAnOrderC100SolicitorJourney({
    page,
    accessibilityTest,
    yesNoManageOrders,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
    errorMessaging,
    isUploadOrder,
    browser,
    caseRef,
    hasJudgeNameAndTitle,
    isCaseworker,
  }: C100DraftAnOrderOptions): Promise<void> {
    //Starting the 'Create/upload draft order' event to upload the order
    await Helpers.chooseEventFromDropdown(page, "Create/upload draft order");
    await DraftAnOrder1Page.draftAnOrder1Page(
      page,
      errorMessaging,
      accessibilityTest,
      isUploadOrder,
    );
    await UploadDraftAnOrder3Page.uploadDraftAnOrder3Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      uploadOrderC100Options,
      uploadOrderFL401Options,
      solicitorCaseCreateType,
    });

   const draftAnOrder4PageC21 = new DraftAnOrder4PageC21(page, accessibilityTest, isUploadOrder);
    await draftAnOrder4PageC21.assertPageContentsToBeVisible();
    await draftAnOrder4PageC21.assertPageContentsToContainText();
    await draftAnOrder4PageC21.selectC21OrderOption("Blank order or directions (C21): application refused");
    await draftAnOrder4PageC21.clickContinue();

    const draftAnOrder5PageC21 = new DraftAnOrder5PageC21(page, accessibilityTest, isUploadOrder, solicitorCaseCreateType);
    await draftAnOrder5PageC21.assertPageContentsToBeVisible();
    await draftAnOrder5PageC21.assertC21RadiosAreSelectable();
    await draftAnOrder5PageC21.fillOrderDetails({
      orderApprovedAtHearing: "Yes",
      hearingApprovedAt: "No hearings available",
      judgeTitle: "Her Honour Judge",
      judgeFullName: "Judge PC",
      legalAdviserFullName: "Legal Adviser PC",
      dateOrderMade: { day: "10", month: "10", year: "2025" },
      orderAboutAllChildren: "Yes",
      uploadOrder: true,
    });
    await draftAnOrder5PageC21.clickContinue();

    const submitPageC21 = new SubmitPageC21(page, accessibilityTest);
      await submitPageC21.assertPageContentsToBeVisible();
      await submitPageC21.assertExpectedLabelValuesPresent();
      await submitPageC21.assertChangeLinksPresentForLabels();
      await submitPageC21.validateAccessibility();
      await submitPageC21.clickSubmit();

  }
}
