import { test } from "../../../../fixtures.ts";
import Config from "../../../../../utils/config.utils.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import { DraftAnOrder5Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder5.po.js";
import {
  DraftOrdersPage,
  OrderInformation,
} from "../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { Page } from "@playwright/test";
import { DraftAnOrder4Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder4.po.js";
import { DraftAnOrder16Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder16.po.js";
import { NonMolestationDraftOrderScenarios as scenarios } from "../../../../../testData/draftOrders.js";

export interface NonMolestationDraftOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  draftAnOrder4Params: DraftAnOrder4Params;
  draftAnOrder5Params: DraftAnOrder5Params;
  draftAnOrder16Params: DraftAnOrder16Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a non molestation order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
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
      draftAnOrder5Params,
      draftAnOrder16Params,
      snapshotName,
      snapshotsPath,
      orderInformation,
    }: NonMolestationDraftOrderParams) => {
      test(`Complete drafting Non-Molestation order as solicitor with the following options: ${name} @accessibility @regression @nightly @visual`, async ({
        browser,
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder5Page,
        draftAnOrder16Page,
        draftAnOrder20Page,
        draftAnOrderSubmitPage,
        navigationUtils,
      }): Promise<void> => {
        await summaryPage.chooseEventFromDropdown("Draft an order");
        await draftAnOrder1Page.assertPageContents();
        await draftAnOrder1Page.verifyAccessibility();
        await draftAnOrder1Page.selectWhatYouWantToDo(isDraftAnOrder);
        await draftAnOrder1Page.clickContinue();
        await draftAnOrder2Page.assertPageContents();
        await draftAnOrder2Page.verifyAccessibility();
        await draftAnOrder2Page.selectOrderType(orderType);
        await draftAnOrder2Page.clickContinue();
        await draftAnOrder4Page.assertPageContents(caseType, orderType);
        await draftAnOrder4Page.verifyAccessibility();
        await draftAnOrder4Page.fillInFields(caseType, draftAnOrder4Params);
        await draftAnOrder4Page.clickContinue();
        await draftAnOrder5Page.assertPageContents(orderType);
        await draftAnOrder5Page.verifyAccessibility();
        await draftAnOrder5Page.fillInFields(draftAnOrder5Params);
        await draftAnOrder5Page.clickContinue();
        await draftAnOrder16Page.assertPageContents(orderType);
        await draftAnOrder16Page.verifyAccessibility();
        await draftAnOrder16Page.fillInFields(draftAnOrder16Params);
        await draftAnOrder16Page.clickContinue();
        await draftAnOrder20Page.assertPageContents(
          orderType,
          caseNumber,
          snapshotName,
          snapshotsPath,
        );
        await draftAnOrder20Page.verifyAccessibility();
        await draftAnOrder20Page.clickContinue();
        await draftAnOrderSubmitPage.assertPageContents(
          snapshotsPath,
          snapshotName,
        );
        await draftAnOrderSubmitPage.verifyAccessibility();
        await draftAnOrderSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Draft an order",
        );

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
