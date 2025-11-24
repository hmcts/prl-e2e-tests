import Config from "../../../../../utils/config.utils.ts";
import { test } from "../../../../fixtures.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import {
  DraftOrdersPage,
  OrderInformation,
} from "../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { Page } from "@playwright/test";
import { DraftAnOrder4Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder4.po.js";
import { ParentalResponsibilityOrderScenarios as scenarios } from "../../../../../testData/draftOrders.ts";

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

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a parental responsibility order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        page,
        Config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  scenarios.forEach(
    ({
      name,
      caseType,
      orderType,
      isDraftAnOrder,
      draftAnOrder4Params,
      responsibleParentFullName,
      snapshotName,
      snapshotsPath,
      orderInformation,
    }: ParentalResponsibilityDraftOrderParams) => {
      test(`Complete drafting Parental Responsibility order as solicitor with the following options: ${name} @accessibility @regression @nightly @visual`, async ({
        browser,
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder8Page,
        draftAnOrder20Page,
        draftAnOrderSubmitPage,
        axeUtils,
        navigationUtils,
      }): Promise<void> => {
        await summaryPage.chooseEventFromDropdown("Draft an order");
        await draftAnOrder1Page.assertPageContents();
        await axeUtils.audit();
        await draftAnOrder1Page.selectWhatYouWantToDo(isDraftAnOrder);
        await draftAnOrder1Page.clickContinue();
        await draftAnOrder2Page.assertPageContents();
        await axeUtils.audit();
        await draftAnOrder2Page.selectOrderType(orderType);
        await draftAnOrder2Page.clickContinue();
        await draftAnOrder4Page.assertPageContents(caseType, orderType);
        await axeUtils.audit();
        await draftAnOrder4Page.fillInFields(caseType, draftAnOrder4Params);
        await draftAnOrder4Page.clickContinue();
        await draftAnOrder8Page.assertPageContents(orderType);
        await axeUtils.audit();
        await draftAnOrder8Page.fillInFields(responsibleParentFullName);
        await draftAnOrder8Page.clickContinue();
        await draftAnOrder20Page.assertPageContents(
          orderType,
          caseNumber,
          snapshotName,
          snapshotsPath,
        );
        await axeUtils.audit();
        await draftAnOrder20Page.clickContinue();
        await draftAnOrderSubmitPage.assertPageContents(
          snapshotsPath,
          snapshotName,
        );
        await axeUtils.audit();
        await draftAnOrderSubmitPage.clickSubmit();

        // open new window as court admin to check the draft orders tab
        const adminPage: Page = await navigationUtils.openNewBrowserWindow(
          browser,
          "caseWorker",
        );
        await navigationUtils.goToCase(
          adminPage,
          Config.manageCasesBaseURLCase,
          caseNumber,
        );
        const draftOrdersPage: DraftOrdersPage = new DraftOrdersPage(adminPage);
        await draftOrdersPage.goToPage();
        await draftOrdersPage.assertDraftOrders(orderInformation);
      });
    },
  );
});
