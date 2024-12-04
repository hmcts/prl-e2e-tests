import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import {
  Fl401AddCaseNumber1Page
} from "../../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import {
  Fl401AddCaseNumberSubmitPage
} from "../../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
}

export class CheckApplication {
  public static async checkApplication({
                                         page,
                                         accessibilityTest,
                                       }: CheckApplicationParams): Promise<void> {
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Check Application",
      "Add Case Number",
    );
    await Fl401AddCaseNumber1Page.fl401AddCaseNumber1Page(
      page,
      accessibilityTest,
    );
    await Fl401AddCaseNumberSubmitPage.fl401AddCaseNumberSubmitPage(
      page,
      accessibilityTest,
    );
  }
}