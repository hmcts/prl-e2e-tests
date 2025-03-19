import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamProvidingEvidenceDomesticAbuseContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamProvidingEvidenceDomesticAbuseContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface MiamProvidingEvidenceDomesticAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamDomesticAbuseProvidingEvidence: boolean;
}

enum uniqueSelectors {
  canProvideEvidenceYes = "#miam_canProvideDomesticAbuseEvidence",
  canProvideEvidenceNo = "#miam_canProvideDomesticAbuseEvidence-2",
  canProvideEvidenceNoField = "#miam_detailsOfDomesticAbuseEvidence",
}

export class MiamProvidingEvidenceDomesticAbusePage {
  public static async miamProvidingEvidenceDomesticAbusePage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
  }: MiamProvidingEvidenceDomesticAbusePageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamProvidingEvidenceDomesticAbusePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamProvidingEvidenceDomesticAbuseContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        MiamProvidingEvidenceDomesticAbuseContent,
        `govukBody`,
        Selectors.GovukBody,
      ),
      Helpers.checkGroup(
        page,
        27,
        MiamProvidingEvidenceDomesticAbuseContent,
        `li`,
        Selectors.li,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${MiamProvidingEvidenceDomesticAbuseContent.govukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamProvidingEvidenceDomesticAbuseContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page); //#TODO: Re-enable when PRL-6519 is completed (rerun 20/01/25, issue still exists)
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamProvidingEvidenceDomesticAbusePageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${MiamProvidingEvidenceDomesticAbuseContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MiamProvidingEvidenceDomesticAbuseContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
  }: Partial<MiamProvidingEvidenceDomesticAbusePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (miamDomesticAbuseProvidingEvidence) {
      await page.click(uniqueSelectors.canProvideEvidenceYes);
    } else {
      await page.click(uniqueSelectors.canProvideEvidenceNo);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${MiamProvidingEvidenceDomesticAbuseContent.govukLabelIndent}")`,
        1,
      );
      await page.fill(
        uniqueSelectors.canProvideEvidenceNoField,
        MiamProvidingEvidenceDomesticAbuseContent.canProvideEvidenceNoField,
      );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
