import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { MiamOtherAttendanceOrNCDRContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamOtherAttendanceOrNCDRContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface MiamOtherAttendanceOrNCDRPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamPreviousAttendanceMediatorSignedDocument: boolean;
}

enum uniqueSelectors {
  haveDocumentYes = "#miam_haveDocSignedByMediatorForPrevAttendance",
  haveDocumentNo = "#miam_haveDocSignedByMediatorForPrevAttendance-2",
  haveDocumentNoField = "#miam_detailsOfEvidence",
}

export class MiamOtherAttendanceOrNCDRPage {
  public static async miamOtherAttendanceOrNCDRPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamPreviousAttendanceMediatorSignedDocument:
      miamPreviousAttendanceMediatorSignedDocument,
  }: MiamOtherAttendanceOrNCDRPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamPreviousAttendanceMediatorSignedDocument:
        miamPreviousAttendanceMediatorSignedDocument,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamOtherAttendanceOrNCDRPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamOtherAttendanceOrNCDRContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamOtherAttendanceOrNCDRContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${MiamOtherAttendanceOrNCDRContent.govukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamOtherAttendanceOrNCDRContent,
        `govukLabel`,
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamOtherAttendanceOrNCDRPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${MiamOtherAttendanceOrNCDRContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${MiamOtherAttendanceOrNCDRContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamPreviousAttendanceMediatorSignedDocument:
      miamPreviousAttendanceMediatorSignedDocument,
  }: Partial<MiamOtherAttendanceOrNCDRPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (miamPreviousAttendanceMediatorSignedDocument) {
      await page.click(uniqueSelectors.haveDocumentYes);
    } else {
      await page.click(uniqueSelectors.haveDocumentNo);
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${MiamOtherAttendanceOrNCDRContent.govukLabelNo}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHint}:text-is("${MiamOtherAttendanceOrNCDRContent.govukHint}")`,
          1,
        ),
      ]);
      await page.fill(
        uniqueSelectors.haveDocumentNoField,
        MiamOtherAttendanceOrNCDRContent.noField,
      );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}