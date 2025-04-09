import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { RestrictedCaseAccess1Page } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccess1Page.ts";
import config from "../../../../config.ts";
import { RestrictedCaseAccess2Page } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccess2Page.ts";
import { RestrictedCaseAccessSubmitPage } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccessSubmitPage.ts";
import { FL401SummaryTabPage } from "../../../../pages/manageCases/caseTabs/FL401/fl401SummaryTabPage.ts";
import { RestrictedCaseAccessConfirmPage } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccessConfirmPage.ts";

interface RestrictedCaseAccessParams {
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
}

export class RestrictedCaseAccess {
  public static async restrictedCaseAccess({
    accessibilityTest,
    ccdRef,
    browser,
  }: RestrictedCaseAccessParams): Promise<void> {
    const judgePage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "judge",
    );
    await Helpers.goToCase(
      judgePage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(judgePage, "Mark case as restricted");
    await RestrictedCaseAccess1Page.restrictedCaseAccess1Page({
      judgePage,
      accessibilityTest,
    });
    await RestrictedCaseAccess2Page.restrictedCaseAccess2Page({
      judgePage,
      accessibilityTest,
    });
    await RestrictedCaseAccessSubmitPage.restrictedCaseAccessSubmitPage({
      judgePage,
      accessibilityTest,
    });
    await RestrictedCaseAccessConfirmPage.restrictedCaseAccessConfirmPage({
      judgePage,
      accessibilityTest,
    });
    await FL401SummaryTabPage.fl401SummaryTabRestrictCaseCheckPage(judgePage);
  }
}
