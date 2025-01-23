import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateBundleSubmitPage } from "../../../../pages/manageCases/caseProgression/createBundle/createBundleSubmitPage.ts";
import { CreateBundle1Page } from "../../../../pages/manageCases/caseProgression/createBundle/createBundle1Page.ts";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";
import { completeEventsUpToServiceOfApplication } from "../../../../common/caseEventsHelper.ts";
import { createOrderFL401Options } from "../../../../common/types.ts";

interface ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  createOrderFL401Options: createOrderFL401Options;
}

export class CreateABundleJourney {
  public static async createABundleJourney({
    page,
    accessibilityTest,
    ccdRef,
    browser,
    manageOrderData,
    createOrderFL401Options,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await completeEventsUpToServiceOfApplication(
      page,
      browser,
      ccdRef,
      manageOrderData,
      createOrderFL401Options,
    );
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Create a bundle");
    await CreateBundle1Page.createBundle1Page({
      page,
      accessibilityTest,
    });
    await CreateBundleSubmitPage.createBundleSubmitPage({
      page,
      accessibilityTest,
    });
  }
}
