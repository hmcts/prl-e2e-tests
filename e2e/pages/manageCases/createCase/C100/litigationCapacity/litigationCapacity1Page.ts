import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { LitigationCapacity1Content } from "../../../../../fixtures/manageCases/createCase/C100/litigationCapacity/litigationCapacity1Content";

interface LitigationCapacity1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoLitigationCapacity: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoLitigationCapacity: boolean;
}

enum UniquesSelectors {
  litigationCapacityFactors = "#litigationCapacityFactors",
  litigationCapacityReferrals = "#litigationCapacityReferrals",
  litigationCapacityOtherFactors_Yes = "#litigationCapacityOtherFactors_Yes",
  litigationCapacityOtherFactors_No = "#litigationCapacityOtherFactors_No",
  litigationCapacityOtherFactorsDetails = "#litigationCapacityOtherFactorsDetails",
}

export class LitigationCapacity1Page {
  public static async litigationCapacity1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoLitigationCapacity: yesNoLitigationCapacity,
  }: LitigationCapacity1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      yesNoLitigationCapacity: yesNoLitigationCapacity,
    });
  }

  private static async checkPageLoads({
    page: page,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${LitigationCapacity1Content.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${LitigationCapacity1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        LitigationCapacity1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${LitigationCapacity1Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${LitigationCapacity1Content.formLabelNo}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoLitigationCapacity: yesNoLitigationCapacity,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${UniquesSelectors.litigationCapacityFactors}`,
      LitigationCapacity1Content.loremIpsum,
    );
    await page.fill(
      `${UniquesSelectors.litigationCapacityReferrals}`,
      LitigationCapacity1Content.loremIpsum,
    );
    if (yesNoLitigationCapacity) {
      await page.click(
        `${UniquesSelectors.litigationCapacityOtherFactors_Yes}`,
      );
      await page.fill(
        `${UniquesSelectors.litigationCapacityOtherFactorsDetails}`,
        LitigationCapacity1Content.loremIpsum,
      );
    } else {
      await page.click(`${UniquesSelectors.litigationCapacityOtherFactors_No}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${LitigationCapacity1Content.continue}")`,
    );
  }
}
