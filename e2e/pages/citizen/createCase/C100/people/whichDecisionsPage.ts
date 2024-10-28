import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WhichDecisionsContent } from "../../../../../fixtures/citizen/createCase/C100/people/whichDecisionsContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface WhichDecisionsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum checkBoxIds {
  needsResolution1 = "needsResolution",
  needsResolution2 = "needsResolution-2",
  needsResolution3 = "needsResolution-3",
  needsResolution4 = "needsResolution-4",
  needsResolution5 = "needsResolution-5",
  needsResolution6 = "needsResolution-6",
  needsResolution7 = "needsResolution-7",
  needsResolution8 = "needsResolution-8",
  needsResolution9 = "needsResolution-9",
  needsResolution10 = "needsResolution-10",
  needsResolution11 = "needsResolution-11",
  needsResolution12 = "needsResolution-12",
  needsResolution13 = "needsResolution-13",
  needsResolution14 = "needsResolution-14",
  needsResolution15 = "needsResolution-15",
}

export class WhichDecisionsPage {
  public static async whichDecisionsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: WhichDecisionsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${WhichDecisionsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${WhichDecisionsContent.hint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        15,
        WhichDecisionsContent,
        "label",
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${WhichDecisionsContent.errorLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${WhichDecisionsContent.errorLink}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    for (const selector of Object.values(checkBoxIds)) {
      await page.click(selector);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
