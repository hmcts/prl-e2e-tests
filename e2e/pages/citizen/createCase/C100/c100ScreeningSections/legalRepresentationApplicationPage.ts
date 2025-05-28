import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors";
import { LegalRepresentationApplicationContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/legalRepresentationApplicationContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${LegalRepresentationApplicationContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${LegalRepresentationApplicationContent.errorMessage}")`,
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
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
