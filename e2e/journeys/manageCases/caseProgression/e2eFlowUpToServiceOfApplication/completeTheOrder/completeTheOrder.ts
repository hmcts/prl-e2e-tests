import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { AdminEditAndApproveAnOrder1Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder1Page.ts";
import { AdminEditAndApproveAnOrder4Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder4Page.ts";
import { AdminEditAndApproveAnOrder21Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder21Page.ts";
import { AdminEditAndApproveAnOrder22Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder22Page.ts";
import { AdminEditAndApproveAnOrder23Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder23Page.ts";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrderSubmitPage.ts";
import config from "../../../../../config.ts";
import { createOrderFL401Options } from "../../../../../common/types.ts";
import { ApplicationJourneysCheckGatekeeperJudgeCOOrder } from "../application-journeys-check-gatekeeper-judgeCO-order.ts";
import { jsonDatas } from "../../../../../common/solicitorCaseCreatorHelper.ts";

interface CompleteTheOrderParams {
  page: Page;
  browser: Browser;
  accessibilityTest: boolean;
  ccdRef: string;
  createOrderFL401Options: createOrderFL401Options;
  personallyServed: boolean;
  manageOrderData: typeof jsonDatas;
}

// ServiceOfApplicationJourney seems to only work when it is put into this file, and not if it
// is put into E2eFlowUpToServiceOfApplication as its own class

export class CompleteTheOrder {
  public static async completeTheOrder({
    page,
    browser,
    accessibilityTest,
    ccdRef,
    createOrderFL401Options,
    personallyServed,
    manageOrderData,
  }: CompleteTheOrderParams): Promise<void> {
    await ApplicationJourneysCheckGatekeeperJudgeCOOrder.applicationJourneysCheckGatekeeperJudgeCOOrder(
      {
        page,
        ccdRef,
        browser,
        manageOrderData,
      },
    );

    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    // complete the task Complete the Order
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Complete the Order - Power of arrest (FL406)",
          "Complete the Order",
        );
        break;
      case "amend discharge varied order":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Complete the Order - Amended, discharged or varied order (FL404B)",
          "Complete the Order",
        );
        break;
    }
    await AdminEditAndApproveAnOrder1Page.adminEditAndApproveAnOrder1Page(
      page,
      accessibilityTest,
      createOrderFL401Options,
    );
    await AdminEditAndApproveAnOrder4Page.adminEditAndApproveAnOrder4Page(
      page,
      accessibilityTest,
      createOrderFL401Options,
    );
    await AdminEditAndApproveAnOrder21Page.adminEditAndApproveAnOrder21Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder22Page.adminEditAndApproveAnOrder22Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder23Page.adminEditAndApproveAnOrder23Page(
      page,
      accessibilityTest,
      personallyServed,
    );
    await AdminEditAndApproveAnOrderSubmitPage.adminEditAndApproveAnOrderSubmitPage(
      page,
      accessibilityTest,
      createOrderFL401Options,
      personallyServed,
    );
  }
}
