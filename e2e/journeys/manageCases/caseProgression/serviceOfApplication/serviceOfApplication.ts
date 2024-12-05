import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { c100CaseWorkerActions } from "../../../../common/types";
import { ServiceOfApplication2Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Page";
import { ServiceOfApplication4Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page";
import { ServiceOfApplicationSubmitPage } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationSubmitPage";

interface ServiceOfApplicationJourneyParams {
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: c100CaseWorkerActions;
}

export class ServiceOfApplicationJourney {
  public static async serviceOfApplicationJourney({
    accessibilityTest,
    browser,
    ccdRef,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await Helpers.chooseEventFromDropdown(page, "Service of application");
    await ServiceOfApplication2Page.serviceOfApplication2Page({
      page,
      accessibilityTest,
    });
    await ServiceOfApplication4Page.serviceOfApplication4Page({
      page,
      accessibilityTest,
    });
    await ServiceOfApplicationSubmitPage.serviceOfApplicationSubmitPage({
      page,
      accessibilityTest,
    });
  }
}
