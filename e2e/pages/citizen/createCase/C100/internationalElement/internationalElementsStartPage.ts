import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { InternationalElementsStartContent } from "../../../../../fixtures/citizen/createCase/C100/internationalElement/internationalElementsStartContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface InternationalElementsStartPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoInternationalElements: boolean;
}

enum uniqueSelectors {
  yesRadio = "#ie_internationalStart",
  yesField = "#ie_provideDetailsStart",
  noRadio = "#ie_internationalStart-2",
}

export class InternationalElementsStartPage {
  public static async internationalElementsStartPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoInternationalElements: yesNoInternationalElements,
  }: InternationalElementsStartPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      yesNoInternationalElements: yesNoInternationalElements,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<InternationalElementsStartPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${InternationalElementsStartContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${InternationalElementsStartContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        InternationalElementsStartContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<InternationalElementsStartPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${InternationalElementsStartContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${InternationalElementsStartContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoInternationalElements: yesNoInternationalElements,
  }: Partial<InternationalElementsStartPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoInternationalElements) {
      await page.click(uniqueSelectors.yesRadio);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${InternationalElementsStartContent.govukProvideDetails}")`,
        1,
      );
      await page.fill(
        uniqueSelectors.yesField,
        InternationalElementsStartContent.provideDetailsField,
      );
    } else {
      await page.click(uniqueSelectors.noRadio);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
