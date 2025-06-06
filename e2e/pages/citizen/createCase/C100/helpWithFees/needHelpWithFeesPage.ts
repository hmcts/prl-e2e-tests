import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { NeedHelpWithFeesContent } from "../../../../../fixtures/citizen/createCase/C100/helpWithFees/needHelpWithFeesContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { CommonContent } from "../../../../../fixtures/manageCases/commonContent.ts";

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
        `${Selectors.GovukBodyM}:has-text("${NeedHelpWithFeesContent.bodyM1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:has-text("${NeedHelpWithFeesContent.bodyM2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:has-text("${CommonContent.c100Fee}")`,
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
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
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
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
