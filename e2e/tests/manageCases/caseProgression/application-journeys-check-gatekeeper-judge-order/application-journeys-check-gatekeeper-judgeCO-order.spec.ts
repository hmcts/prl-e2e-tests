import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { ApplicationJourneysCheckGatekeeperJudgeCOOrder } from "../../../../journeys/manageCases/caseProgression/manageOrders/application-journeys-check-gatekeeper-judgeCO-order";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test(`Complete Check Application without accessibility test,
        send to gatekeeper journey,
        judge create an order journey with params:
        yesNoSendToGateKeeper=true,
        createOrderFL401Options=power of arrest,
        judgeTitles=Her Honour Judge,
        withOrWithoutNotice=true,
        createOrderManageOrders19Options=dateToBeFixed,
        howLongWillOrderBeInForce=untilNextHearing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ApplicationJourneysCheckGatekeeperJudgeCOOrder.applicationJourneysCheckGatekeeperJudgeCOOrder(
      {
        page: page,
        accessibilityTest: false,
        yesNoSendToGateKeeper: true,
        ccdRef: ccdRef,
        c100CaseWorkerActions: "Manage orders",
        manageOrdersOptions: "create order",
        createOrderFL401Options: "power of arrest",
        yesNoManageOrders: false,
        judgeTitles: "Her Honour Judge",
        withOrWithoutNotice: true,
        createOrderManageOrders19Options: "dateToBeFixed", // "dateConfirmed" will not pass because page 19 does not give a hearing you are allowed to select
        howLongWillOrderBeInForce: "untilNextHearing", // Should not matter unless non-molestation order is selected.
        yesNoServiceOfApplication4: true,
        responsibleForServing: "courtBailiff",
        browser: browser,
      },
    );
  });

  test(`Complete Check Application with accessibility test,
        send to gatekeeper journey,
        judge create an order journey with params:
        yesNoSendToGateKeeper=true,
        createOrderFL401Options=amend discharge varied order,
        judgeTitles=Deputy Circuit Judge,
        withOrWithoutNotice=false,
        createOrderManageOrders19Options=dateToBeFixed,
        howLongWillOrderBeInForce=untilNextHearing. @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ApplicationJourneysCheckGatekeeperJudgeCOOrder.applicationJourneysCheckGatekeeperJudgeCOOrder(
      {
        page: page,
        accessibilityTest: true,
        yesNoSendToGateKeeper: true,
        ccdRef: ccdRef,
        c100CaseWorkerActions: "Manage orders",
        manageOrdersOptions: "create order",
        createOrderFL401Options: "amend discharge varied order",
        yesNoManageOrders: false,
        judgeTitles: "Deputy Circuit Judge",
        withOrWithoutNotice: false,
        createOrderManageOrders19Options: "dateToBeFixed", // "dateConfirmed" will not pass because page 19 does not give a hearing selectOption you are allowed to select
        howLongWillOrderBeInForce: "untilNextHearing", // Should not matter unless non-molestation order is selected
        yesNoServiceOfApplication4: true,
        responsibleForServing: "courtBailiff",
        browser: browser,
      },
    );
  });
});
