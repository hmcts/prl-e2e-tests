import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { internationalElementsParentsContent } from "../../../../../fixtures/citizen/createCase/C100/internationalElement/internationalElementsParentsContent";
import { InternationalElementsStartContent } from "../../../../../fixtures/citizen/createCase/C100/internationalElement/internationalElementsStartContent";

interface InternationalElementsParentsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoInternationalElements: boolean;
}

enum uniqueSelectors {
  yesRadio = "#ie_internationalParents",
  yesField = "#ie_provideDetailsParents",
  noRadio = "#ie_internationalParents-2",
}

export class InternationalElementsParentsPage {
  public static async internationalElementsParentsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoInternationalElements: yesNoInternationalElements,
  }: InternationalElementsParentsPageOptions): Promise<void> {
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
  }: Partial<InternationalElementsParentsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${internationalElementsParentsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${internationalElementsParentsContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        internationalElementsParentsContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Commented out until ticket-6600 is complete
    // }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<InternationalElementsParentsPageOptions>): Promise<void> {
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${internationalElementsParentsContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${internationalElementsParentsContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoInternationalElements: yesNoInternationalElements,
  }: Partial<InternationalElementsParentsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoInternationalElements) {
      await page.click(uniqueSelectors.yesRadio);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${internationalElementsParentsContent.govukProvideDetails}")`,
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
