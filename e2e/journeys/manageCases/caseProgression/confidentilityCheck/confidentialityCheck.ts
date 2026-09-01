import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { ConfidentialityCheck1Page } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/confidentialityCheck1Page.ts";
import { ConfidentialityCheckSubmitPage } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/confidentialityCheckSubmitPage.ts";
import { ConfidentialityCheckConfirmPage } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/confidentialityCheckConfirmPage.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { C100ConfidentialityCheck1Page } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/c100ConfidentialityCheck1Page.ts";
import { C100ConfidentialityCheckConfirmPage } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/c100ConfidentialityCheckConfirmPage.ts";

interface FL401ConfidentialityCheckParams {
  page: Page;
  accessibilityTest: boolean;
  isApplicationServedAfterConfidentialityCheck: boolean;
  browserName: string;
}

interface C100ConfidentialityCheckParams {
  page: Page;
  accessibilityTest: boolean;
  isApplicationServedAfterConfidentialityCheck: boolean;
  browserName: string;
}

enum UniqueSelectors {
  tab = ".mat-tab-label",
  rightArrowTab = ".mat-tab-header-pagination-after",
  plusButtonOnSoaTabView = ".accordion-image",
}

export class ConfidentialityCheck {
  public static async FL401confidentialityCheck({
    page,
    accessibilityTest,
    isApplicationServedAfterConfidentialityCheck,
    browserName,
  }: FL401ConfidentialityCheckParams): Promise<void> {
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "C8 - Confidential details check",
      "Confidential Check",
    );
    await ConfidentialityCheck1Page.confidentialityCheck1Page({
      page: page,
      browserName: browserName,
      accessibilityTest: accessibilityTest,
      isApplicationServedAfterConfidentialityCheck:
        isApplicationServedAfterConfidentialityCheck,
    });
    await ConfidentialityCheckSubmitPage.confidentialityCheckSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      isApplicationServedAfterConfidentialityCheck:
        isApplicationServedAfterConfidentialityCheck,
    });
    await ConfidentialityCheckConfirmPage.confidentialityCheckConfirmPage(
      page,
      accessibilityTest,
    );
    await this.checkServiceOfApplicationTab(page);
  }

  private static async checkServiceOfApplicationTab(page: Page): Promise<void> {
    // click service of application tab
    await page.click(UniqueSelectors.rightArrowTab);
    await page
      .locator(UniqueSelectors.tab, {
        hasText: "Service of application",
      })
      .click();
    // check there is a served pack
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("Served pack")`,
      1,
    );
  }

  public static async C100confidentialityCheck({
    page,
    accessibilityTest,
    isApplicationServedAfterConfidentialityCheck,
    browserName,
  }: C100ConfidentialityCheckParams): Promise<void> {
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "C8 - Confidential details check",
      "Confidential Check",
    );
    await C100ConfidentialityCheck1Page.c100ConfidentialityCheck1Page({
      page: page,
      browserName: browserName,
      accessibilityTest: accessibilityTest,
      isApplicationServedAfterConfidentialityCheck:
        isApplicationServedAfterConfidentialityCheck,
    });
    await ConfidentialityCheckSubmitPage.confidentialityCheckSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      isApplicationServedAfterConfidentialityCheck:
        isApplicationServedAfterConfidentialityCheck,
    });
    await C100ConfidentialityCheckConfirmPage.c100ConfidentialityCheckConfirmPage(
      page,
      accessibilityTest,
    );
    await this.checkServiceOfApplicationTab(page);
  }

  // cut down version of the confidential details journey
  public static async confidentialityCheckLite(
    browser: Browser,
    caseRef: string,
  ): Promise<void> {
    // login as case manager & wait for confidential check task
    const caseManagerPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseManager",
    );
    await Helpers.goToCase(
      caseManagerPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      caseManagerPage,
      "C8 - Confidential details check",
      "Confidential Check",
    );
    // confidentialityCheck1Page
    await caseManagerPage.click("#applicationServedYesNo_Yes");
    await caseManagerPage.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    // confidentialityCheckSubmitPage
    await caseManagerPage.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
    // confidentialityCheckConfirmPage
    await caseManagerPage.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
