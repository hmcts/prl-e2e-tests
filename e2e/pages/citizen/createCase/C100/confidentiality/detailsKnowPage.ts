import { Page } from "@playwright/test";
import { yesNoDontKnow } from "../../../../../common/types";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { DetailsKnowContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/detailsKnowContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum inputIDs {
  yes = "#detailsKnown",
  no = "#detailsKnown-2",
  dontKnow = "#detailsKnown-3",
}

interface DetailsKnowPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
}

export class DetailsKnowPage {
  public static async detailsKnowPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100OthersKnowApplicantsContact,
  }: DetailsKnowPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100OthersKnowApplicantsContact,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${DetailsKnowContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:has-text("${DetailsKnowContent.caption}")`,
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${DetailsKnowContent.iDontKnow}")`,
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
        `${Selectors.ErrorSummaryList} ${Selectors.a}:text-is("${DetailsKnowContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${DetailsKnowContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100OthersKnowApplicantsContact,
  }: FillInFieldsOptions): Promise<void> {
    if (!(c100OthersKnowApplicantsContact in Object.keys(inputIDs))) {
      throw new Error(
        `The value c100OthersKnowApplicantsContact must be one of 'yes', 'no', 'dontKnow'. You used ${c100OthersKnowApplicantsContact}`,
      );
    }
    let inputKey = c100OthersKnowApplicantsContact as keyof typeof inputIDs;
    await page.click(inputIDs[inputKey]);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
