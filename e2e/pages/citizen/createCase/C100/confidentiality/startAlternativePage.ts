import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { StartAlternativeContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/StartAlternativeContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";


enum inputIDs {
  yes = "#startAlternative",
  no = "#startAlternative-2",
}

enum checkboxIDs {
  address = '#contactDetailsPrivateAlternative',
  telephone = '#contactDetailsPrivateAlternative-2',
  email = '#contactDetailsPrivateAlternative-3'
}

interface StartAlternativePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PrivateDetails: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100PrivateDetails: boolean;
}

export class StartAlternativePage {
  public static async startAlternativePage({
    page,
    accessibilityTest,
    errorMessaging,
    c100PrivateDetails,
  }: StartAlternativePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100PrivateDetails: c100PrivateDetails,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${StartAlternativeContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        StartAlternativeContent,
        "bodyM",
        `${Selectors.GovukBodyM}`,
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
        `${Selectors.ErrorSummaryList} ${Selectors.a}:text-is("${StartAlternativeContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${StartAlternativeContent.errorMessage}")`,
        1,
      ),
    ]);
    await this.checkboxErrorMessages(page)
  }

  private static async checkboxErrorMessages(
    page: Page
  ): Promise<void> {
    await page.click(
      inputIDs.yes
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${StartAlternativeContent.checkboxErrorSummaryList}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${StartAlternativeContent.checkboxErrorMessage}")`,
        1
      ),
    ])
  }

  private static async fillInFields({
  page,
  c100PrivateDetails,
}: FillInFieldsOptions): Promise<void> {
    if (c100PrivateDetails) {
      await page.click(inputIDs.yes);
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormHint}:text-is("${StartAlternativeContent.formHint}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          3,
          StartAlternativeContent,
          'formLabel',
          `${Selectors.GovukFormLabel}`
        )
      ]);
      for (let checkboxID of Object.values(checkboxIDs)) {
        await page.check(
          checkboxID
        );
      }
    } else {
      await page.click(inputIDs.no);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
