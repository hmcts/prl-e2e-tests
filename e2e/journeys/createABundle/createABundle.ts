import { Page } from "@playwright/test";
import { c100CaseWorkerActions } from "../../common/types";
import { Helpers } from "../../common/helpers";
import { CreateBundleSubmitPage } from "../../pages/manageCases/caseProgression/createBundle/createBundleSubmitPage";
import { CreateBundle1Page } from "../../pages/manageCases/caseProgression/createBundle/createBundle1Page";


interface ServiceOfApplicationJourneyParams {
  page: Page;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: c100CaseWorkerActions;
}

export class CreateABundleJourney {
  public static async createABundleJourney({
    page,
    accessibilityTest,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Create A Bundle");
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
