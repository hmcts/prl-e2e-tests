import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { NeedHelpWithFeesContent } from "../../../../../fixtures/citizen/createCase/C100/helpWithFees/needHelpWithFeesContent";
import { Helpers } from "../../../../../common/helpers";
import { SafetyConcernHelpers } from "../safetyConcerns/safetyConcernHelpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum inputIDs {
  radioYes = "#hwf_needHelpWithFees",
  radioNo = "#hwf_needHelpWithFees-2",
}

interface NeedHelpWithFeesPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoNeedHelpWithFees: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100YesNoNeedHelpWithFees: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class NeedHelpWithFeesPage {
  public static async needHelpWithFeesPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100YesNoNeedHelpWithFees,
  }: NeedHelpWithFeesPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100YesNoNeedHelpWithFees: c100YesNoNeedHelpWithFees,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${NeedHelpWithFeesContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${NeedHelpWithFeesContent.bodyM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${NeedHelpWithFeesContent.link}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, NeedHelpWithFeesContent, "li", Selectors.li),
      Helpers.checkGroup(
        page,
        2,
        NeedHelpWithFeesContent,
        "formLabel",
        Selectors.GovukLabel,
      ),
    ]);
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${NeedHelpWithFeesContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${NeedHelpWithFeesContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100YesNoNeedHelpWithFees,
  }: FillInFieldsOptions): Promise<void> {
    if (c100YesNoNeedHelpWithFees) {
      await page.click(inputIDs.radioYes);
    } else {
      await page.click(inputIDs.radioNo);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}}")`,
    );
  }
}
