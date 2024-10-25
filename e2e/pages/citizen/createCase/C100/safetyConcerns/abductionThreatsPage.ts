import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { AbductionThreatsContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/abductionThreatsContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { SafetyConcernHelpers } from "./safetyConcernHelpers";

enum radioIDs {
  radioYes = "#c1A_childAbductedBefore",
  radioNo = "#c1A_childAbductedBefore-2",
}

interface AbductionThreatsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildrenAbductedBefore: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100ChildrenAbductedBefore: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class AbductionThreatsPage {
  public static async abductionThreatsPage({
                                           page,
                                           accessibilityTest,
                                           errorMessaging,
                                           c100ChildrenAbductedBefore,
                                         }: AbductionThreatsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100ChildrenAbductedBefore: c100ChildrenAbductedBefore,
    });
  }

  private static async checkPageLoads({
                                        page,
                                        accessibilityTest,
                                      }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${AbductionThreatsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${AbductionThreatsContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    await SafetyConcernHelpers.checkPassportSidebar(page);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${AbductionThreatsContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${AbductionThreatsContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
                                      page,
                                      c100ChildrenAbductedBefore,
                                    }: FillInFieldsOptions): Promise<void> {
    if (c100ChildrenAbductedBefore) {
      await page.click(radioIDs.radioYes);
    } else {
      await page.click(radioIDs.radioNo);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
