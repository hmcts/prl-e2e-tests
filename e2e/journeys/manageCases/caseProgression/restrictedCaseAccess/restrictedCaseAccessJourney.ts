import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { RestrictedCaseAccess1Page } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccess1Page.ts";
import config from "../../../../config.ts";
import { RestrictedCaseAccess2Page } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccess2Page.ts";
import { RestrictedCaseAccessSubmitPage } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccessSubmitPage.ts";
import { FL401SummaryTabPage } from "../../../../pages/manageCases/caseTabs/FL401/fl401SummaryTabPage.ts";
import { RestrictedCaseAccessConfirmPage } from "../../../../pages/manageCases/caseProgression/restricedCaseAccess/restrictedCaseAccessConfirmPage.ts";

interface RestrictedCaseAccessParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
}

export class RestrictedCaseAccess {
  public static async restrictedCaseAccess({
    page,
    accessibilityTest,
    ccdRef,
  }: RestrictedCaseAccessParams): Promise<void> {
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(page, "Mark case as restricted");
    await RestrictedCaseAccess1Page.restrictedCaseAccess1Page({
      page,
      accessibilityTest,
    });
    await RestrictedCaseAccess2Page.restrictedCaseAccess2Page({
      page,
      accessibilityTest,
    });
    await RestrictedCaseAccessSubmitPage.restrictedCaseAccessSubmitPage({
      page,
      accessibilityTest,
    });
    await RestrictedCaseAccessConfirmPage.restrictedCaseAccessConfirmPage({
      page,
      accessibilityTest,
    });
    await FL401SummaryTabPage.fl401SummaryTabRestrictCaseCheckPage(page);
  }
}
