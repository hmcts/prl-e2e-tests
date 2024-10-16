import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";
import { Selectors } from "../../common/selectors";
import { LegalRepresentationApplicationContent } from "../../fixtures/citizen/createCase/C100/c100ScreeningSections/legalRepresentationApplicationContent";
import { Helpers } from "../../common/helpers";

enum inputIDs {
  radioYes = "#sq_legalRepresentationApplication",
  radioNo = "#sq_legalRepresentationApplication-2",
}

interface LegalRepresentationApplicationPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ApplicationCompletedForYou: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100ApplicationCompletedForYou: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class LegalRepresentationApplicationPage {
  public static async legalRepresentationApplicationPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100ApplicationCompletedForYou,
  }: LegalRepresentationApplicationPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100ApplicationCompletedForYou,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${LegalRepresentationApplicationContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        LegalRepresentationApplicationContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${LegalRepresentationApplicationContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${LegalRepresentationApplicationContent.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${LegalRepresentationApplicationContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${LegalRepresentationApplicationContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100ApplicationCompletedForYou,
  }: FillInFieldsOptions): Promise<void> {
    if (c100ApplicationCompletedForYou) {
      await page.click(inputIDs.radioYes);
    } else {
      await page.click(inputIDs.radioNo);
    }
    await page.click(
      `${Selectors.button}:text-is("${LegalRepresentationApplicationContent.continue}")`,
    );
  }
}
