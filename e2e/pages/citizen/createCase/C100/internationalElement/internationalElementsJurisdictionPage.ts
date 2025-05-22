import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { internationalElementsJurisdictionContent } from "../../../../../fixtures/citizen/createCase/C100/internationalElement/internationalElementsJurisdictionContent.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface InternationalElementsJurisdictionPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoInternationalElements: boolean;
}

enum uniqueSelectors {
  yesRadio = "#ie_internationalJurisdiction",
  yesField = "#ie_provideDetailsJurisdiction",
  noRadio = "#ie_internationalJurisdiction-2",
}

export class InternationalElementsJurisdictionPage {
  public static async internationalElementsJurisdictionPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoInternationalElements: yesNoInternationalElements,
  }: InternationalElementsJurisdictionPageOptions): Promise<void> {
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
  }: Partial<InternationalElementsJurisdictionPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${internationalElementsJurisdictionContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${internationalElementsJurisdictionContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        internationalElementsJurisdictionContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page, [uniqueSelectors.yesRadio]);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<InternationalElementsJurisdictionPageOptions>): Promise<void> {
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${internationalElementsJurisdictionContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${internationalElementsJurisdictionContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoInternationalElements: yesNoInternationalElements,
  }: Partial<InternationalElementsJurisdictionPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoInternationalElements) {
      await page.click(uniqueSelectors.yesRadio);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${internationalElementsJurisdictionContent.govukProvideDetails}")`,
        1,
      );
      await page.fill(
        uniqueSelectors.yesField,
        internationalElementsJurisdictionContent.provideDetailsField,
      );
    } else {
      await page.click(uniqueSelectors.noRadio);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
