import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  MiamProvidingEvidenceDomesticAbuseContent
} from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamProvidingEvidenceDomesticAbuseContent";
import { Helpers } from "../../../../../common/helpers";
import AxeTest from "../../../../../common/accessibilityTestHelper";

interface MiamProvidingEvidenceDomesticAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  miamDomesticAbuseProvidingEvidence: boolean;
}

export class MiamProvidingEvidenceDomesticAbusePage {


  private static async checkPageLoads({page: page, accessibilityTest: accessibilityTest}: Partial<MiamProvidingEvidenceDomesticAbusePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(`${Selectors.GovukHeadingL}:text-is("${MiamProvidingEvidenceDomesticAbuseContent.pageTitle}")`);
    await Promise.all([
      Helpers.checkGroup(page, 3, MiamProvidingEvidenceDomesticAbuseContent, `govukBody`, Selectors.GovukBody),
      Helpers.checkGroup(page, 27, MiamProvidingEvidenceDomesticAbuseContent, `li`, Selectors.li),
      Helpers.checkVisibleAndPresent(page, `${Selectors.GovukFieldsetLegend}:text-is("${MiamProvidingEvidenceDomesticAbuseContent.govukFieldsetLegend}")`, 1),
      Helpers.checkGroup(page, 3, MiamProvidingEvidenceDomesticAbuseContent, `govukLabel`, Selectors.GovukLabel),
    ])
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }
}
