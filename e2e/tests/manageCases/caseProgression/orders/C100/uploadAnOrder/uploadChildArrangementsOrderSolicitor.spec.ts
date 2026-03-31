import config from "../../../../../../utils/config.utils.ts";
import { test } from "../../../../../fixtures.ts";
import {
  C21UploadOrderScenarios,
  ChildArrangementsUploadOrderScenarios,
} from "../../../../../../testData/draftOrders.js";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../common/types.js";
import { DraftAnOrder5Params } from "../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.js";
import { OrderInformation } from "../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { DraftAnOrder8Params } from "../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder8.po.js";
import { DraftAnOrder4Params } from "../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder4.po.js";
import { SolicitorPagesGroup } from "../../../../../../pageObjects/roleBasedGroupedPages/solicitorPages.js";
import { CourtAdminStokePagesGroup } from "../../../../../../pageObjects/roleBasedGroupedPages/courtAdminStokePages.js";

export interface ChildArrangementsUploadOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  isOrderByConsent: boolean;
  draftAnOrder5Params: DraftAnOrder5Params;
  draftAnOrder8Params: DraftAnOrder8Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}
export interface C21UploadOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  isOrderByConsent: boolean;
  draftAnOrder4Params: DraftAnOrder4Params;
  draftAnOrder5Params: DraftAnOrder5Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("'Upload an order' by Solicitor via the 'Create/upload draft order' event tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createCACase(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  //C43 upload order
  ChildArrangementsUploadOrderScenarios.forEach(
    (uploadOrderParams: ChildArrangementsUploadOrderParams) => {
      test(`CA 'Upload an C43 order' as a Solicitor with the following options:${uploadOrderParams.name} @regression @nightly @visual`, async ({
        solicitor,
        courtAdminStoke,
        navigationUtils,
      }): Promise<void> => {
        await uploadC100Orders(
          caseNumber,
          solicitor,
          uploadOrderParams,
          "C43",
          courtAdminStoke,
          navigationUtils,
        );
      });
    },
  );

  //C21 upload order
  C21UploadOrderScenarios.forEach((uploadOrderParams: C21UploadOrderParams) => {
    test(`CA 'Upload an C21 order' as a Solicitor with the following options:${uploadOrderParams.name} @regression @visual`, async ({
      solicitor,
      courtAdminStoke,
      navigationUtils,
    }): Promise<void> => {
      await uploadC100Orders(
        caseNumber,
        solicitor,
        uploadOrderParams,
        "C21",
        courtAdminStoke,
        navigationUtils,
      );
    });
  });
});

async function uploadC100Orders(
  caseNumber: string,
  solicitor: SolicitorPagesGroup,
  uploadOrderParams,
  C100OrderType: string,
  courtAdminStoke: CourtAdminStokePagesGroup,
  navigationUtils,
) {
  const { draftOrders, summaryPage } = solicitor;

  await summaryPage.chooseEventFromDropdown("Create/upload draft order");
  await draftOrders.draftAnOrder1Page.assertPageContents();
  await draftOrders.draftAnOrder1Page.verifyAccessibility();
  await draftOrders.draftAnOrder1Page.selectWhatYouWantToDo(
    uploadOrderParams.isDraftAnOrder,
  );
  await draftOrders.draftAnOrder1Page.clickContinue();

  await draftOrders.draftAnOrder3Page.assertPageContents();
  await draftOrders.draftAnOrder3Page.verifyAccessibility();
  await draftOrders.draftAnOrder3Page.selectOrderTypeAndConsent(
    uploadOrderParams.orderType,
    uploadOrderParams.isOrderByConsent,
  );
  await draftOrders.draftAnOrder3Page.clickContinue();

  if (C100OrderType === "C21") {
    await draftOrders.draftAnOrder4Page.assertPageContents();
    await draftOrders.draftAnOrder4Page.verifyAccessibility();
    await draftOrders.draftAnOrder4Page.selectC21OrderDetails(
      uploadOrderParams.draftAnOrder4Params,
    );
    await draftOrders.draftAnOrder4Page.clickContinue();
  }
  await draftOrders.draftAnOrder5Page.assertPageContents(
    uploadOrderParams.isDraftAnOrder,
    uploadOrderParams.caseType,
    uploadOrderParams.orderType,
  );
  await draftOrders.draftAnOrder5Page.verifyAccessibility();
  await draftOrders.draftAnOrder5Page.fillInFields(
    uploadOrderParams.isDraftAnOrder,
    uploadOrderParams.caseType,
    uploadOrderParams.draftAnOrder5Params,
  );
  await draftOrders.draftAnOrder5Page.clickContinue();

  if (C100OrderType === "C43") {
    await draftOrders.draftAnOrder8Page.assertPageContents();
    await draftOrders.draftAnOrder8Page.verifyAccessibility();
    await draftOrders.draftAnOrder8Page.selectC43OrderDetails(
      uploadOrderParams.draftAnOrder8Params,
    );
    await draftOrders.draftAnOrder8Page.clickContinue();
  }

  await draftOrders.draftAnOrderSubmitPage.assertPageContents(
    uploadOrderParams.snapshotsPath,
    uploadOrderParams.snapshotName,
  );
  await draftOrders.draftAnOrderSubmitPage.verifyAccessibility();
  await draftOrders.draftAnOrderSubmitPage.clickSubmit();
  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Create/upload draft order",
  );
  // check the draft orders tab as court admin
  await navigationUtils.goToCase(
    courtAdminStoke.page,
    config.manageCasesBaseURLCase,
    caseNumber,
  );

  const { draftedOrders } = courtAdminStoke;
  await draftedOrders.draftOrdersPage.goToPage();
  await draftedOrders.draftOrdersPage.assertDraftOrders(
    uploadOrderParams.orderInformation,
  );
}
