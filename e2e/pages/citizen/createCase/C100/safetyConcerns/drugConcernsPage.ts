import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { DrugConcernsContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/drugConcernsContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum inputIDs {
  radioYes = "#c1A_otherConcernsDrugs",
  radioNo = "#c1A_otherConcernsDrugs-2",
  drugDetails = "#c1A_otherConcernsDrugsDetails",
}

interface DrugConcernsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoDrugConcerns: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100YesNoDrugConcerns: boolean;
}

export class DrugConcernsPage {
  public static async drugConcernsPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100YesNoDrugConcerns,
  }: DrugConcernsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100YesNoDrugConcerns: c100YesNoDrugConcerns,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${DrugConcernsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        DrugConcernsContent,
        "body",
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${DrugConcernsContent.caption}")`,
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
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${DrugConcernsContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${DrugConcernsContent.errorMessage}")`,
        1,
      ),
    ]);
    await this.checkNestedErrorMessaging(page);
  }

  private static async checkNestedErrorMessaging(page: Page): Promise<void> {
    await page.click(inputIDs.radioYes);
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${DrugConcernsContent.descriptionErrorList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${DrugConcernsContent.descriptionErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100YesNoDrugConcerns,
  }: FillInFieldsOptions): Promise<void> {
    if (c100YesNoDrugConcerns) {
      await page.click(inputIDs.radioYes);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${DrugConcernsContent.descriptionLabel}")`,
        1,
      );
      await page.fill(inputIDs.drugDetails, DrugConcernsContent.drugDetails);
    } else {
      await page.click(inputIDs.radioNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
