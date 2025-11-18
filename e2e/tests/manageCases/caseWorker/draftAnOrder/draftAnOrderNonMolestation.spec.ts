import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import {
  DraftAnOrder,
  HowLongWillTheOrderBeInForce,
} from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import {
  OrderType,
  solicitorCaseCreateType,
} from "../../../../common/types.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
// TEST COMMENT
test.describe("Draft a non molestation order tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  [
    {
      errorMessaging: false,
      accessibilityTest: false,
      caseType: "FL401" as solicitorCaseCreateType,
      orderType: "nonMolestation" as OrderType,
      yesNoToAll: false,
      howLongWillOrderBeInForce:
        "specifiedDateAndTime" as HowLongWillTheOrderBeInForce,
      willAllPartiesAttendHearing: false,
      checkPdf: true,
      isUploadOrder: false,
    },
    {
      errorMessaging: false,
      accessibilityTest: false,
      caseType: "FL401" as solicitorCaseCreateType,
      orderType: "nonMolestation" as OrderType,
      yesNoToAll: true,
      howLongWillOrderBeInForce:
        "specifiedDateAndTime" as HowLongWillTheOrderBeInForce,
      willAllPartiesAttendHearing: true,
      checkPdf: true,
      isUploadOrder: false,
    },
    {
      errorMessaging: false,
      accessibilityTest: true,
      caseType: "FL401" as solicitorCaseCreateType,
      orderType: "nonMolestation" as OrderType,
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate" as HowLongWillTheOrderBeInForce,
      willAllPartiesAttendHearing: false,
      checkPdf: true,
      isUploadOrder: false,
    },
  ].forEach(
    ({
      errorMessaging,
      accessibilityTest,
      caseType,
      orderType,
      yesNoToAll,
      howLongWillOrderBeInForce,
      willAllPartiesAttendHearing,
      checkPdf,
      isUploadOrder,
    }) => {
      test(`Complete Drafting a non molestation order as a solicitor with the following options:
      yesNoToAll: ${yesNoToAll}
      accessibilityTest: ${accessibilityTest}`, async ({
        page,
        browser,
      }): Promise<void> => {
        await DraftAnOrder.draftAnOrder({
          page: page,
          errorMessaging: errorMessaging,
          accessibilityTest: accessibilityTest,
          caseType: caseType,
          orderType: orderType,
          yesNoToAll: yesNoToAll,
          howLongWillOrderBeInForce: howLongWillOrderBeInForce,
          willAllPartiesAttendHearing: willAllPartiesAttendHearing,
          browser: browser,
          caseRef: caseRef,
          checkPdf: checkPdf,
          isUploadOrder: isUploadOrder,
        });
      });
    },
  );
});
