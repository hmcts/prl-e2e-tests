import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { internationalElementsRequestContent } from "../../../../../fixtures/citizen/createCase/C100/internationalElement/internationalElementsRequestContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface InternationalElementsRequestPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoInternationalElements: boolean;
}

enum uniqueSelectors {
  yesRadio = "#ie_internationalRequest",
  yesField = "#ie_provideDetailsRequest",
  noRadio = "#ie_internationalRequest-2",
}

export class InternationalElementsRequestPage {
  public static async internationalElementsRequestPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoInternationalElements: yesNoInternationalElements,
  }: InternationalElementsRequestPageOptions): Promise<void> {
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
  }: Partial<InternationalElementsRequestPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${internationalElementsRequestContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${internationalElementsRequestContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        internationalElementsRequestContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [uniqueSelectors.yesRadio],
      });
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<InternationalElementsRequestPageOptions>): Promise<void> {
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${internationalElementsRequestContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${internationalElementsRequestContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoInternationalElements: yesNoInternationalElements,
  }: Partial<InternationalElementsRequestPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoInternationalElements) {
      await page.click(uniqueSelectors.yesRadio);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${internationalElementsRequestContent.govukProvideDetails}")`,
        1,
      );
      await page.fill(
        uniqueSelectors.yesField,
        internationalElementsRequestContent.provideDetailsField,
      );
    } else {
      await page.click(uniqueSelectors.noRadio);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
