import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamDomesticAbuseUploadEvidenceContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamDomesticAbuseUploadEvidenceContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import config from "../../../../../utils/config.utils.ts";
import { AxeUtils } from "@hmcts/playwright-common";

export interface MiamDomesticAbuseUploadEvidencePageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const fileUpload: string = "#fileupload";

export class MiamDomesticAbuseUploadEvidencePage {
  public static async miamDomesticAbuseUploadEvidencePage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamDomesticAbuseUploadEvidencePageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({ page: page });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamDomesticAbuseUploadEvidencePageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamDomesticAbuseUploadEvidenceContent.pageTitle}")`,
    );
    await page.click(
      `${Selectors.GovukSummaryText}:has-text("${MiamDomesticAbuseUploadEvidenceContent.govukDetailsSummaryText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${MiamDomesticAbuseUploadEvidenceContent.fontBold}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${MiamDomesticAbuseUploadEvidenceContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        MiamDomesticAbuseUploadEvidenceContent,
        `li`,
        `${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<MiamDomesticAbuseUploadEvidencePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.setInputFiles(`${fileUpload}`, config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${MiamDomesticAbuseUploadEvidenceContent.uploadButton}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${MiamDomesticAbuseUploadEvidenceContent.removeButton}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
