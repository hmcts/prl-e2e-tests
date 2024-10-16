import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { LegalRepresentationContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/legalRepresentationContent";
import { Helpers } from "../../../../../common/helpers";

enum inputIDs {
  radioYes = "#sq_legalRepresentation",
  radioNo = "#sq_legalRepresentation-2",
}

interface LegalRepresentationPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100LegalRepresentation: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class LegalRepresentationPage {
  public static async legalRepresentationPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation,
  }: LegalRepresentationPageOptions) {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100LegalRepresentation,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${LegalRepresentationContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        LegalRepresentationContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        LegalRepresentationContent,
        "link",
        `${Selectors.GovukLink}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${LegalRepresentationContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${LegalRepresentationContent.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${LegalRepresentationContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${LegalRepresentationContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100LegalRepresentation,
  }: FillInFieldsOptions): Promise<void> {
    if (c100LegalRepresentation) {
      await page.click(inputIDs.radioYes);
    } else {
      await page.click(inputIDs.radioNo);
    }
    await page.click(
      `${Selectors.button}:text-is("${LegalRepresentationContent.continue}")`,
    );
  }
}
