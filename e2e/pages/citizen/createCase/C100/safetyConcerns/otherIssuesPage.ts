import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherIssuesContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/otherIssuesContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SafetyConcernHelpers } from "./safetyConcernHelpers";

enum inputIDs {
  radioYes = "#c1A_childSafetyConcerns",
  radioNo = "#c1A_childSafetyConcerns-2",
  otherDetails = "#c1A_childSafetyConcernsDetails",
}

interface OtherIssuesPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoOtherIssues: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100YesNoOtherIssues: boolean;
}

export class OtherIssuesPage {
  public static async otherIssuesPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100YesNoOtherIssues,
  }: OtherIssuesPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100YesNoOtherIssues: c100YesNoOtherIssues,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${OtherIssuesContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OtherIssuesContent.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${OtherIssuesContent.caption}")`,
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
    await SafetyConcernHelpers.checkContactDetailsText(page);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Commented out until ticket-6592 is complete
    // }
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${OtherIssuesContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherIssuesContent.errorMessage}")`,
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${OtherIssuesContent.descriptionErrorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherIssuesContent.descriptionErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100YesNoOtherIssues,
  }: FillInFieldsOptions): Promise<void> {
    if (c100YesNoOtherIssues) {
      await page.click(inputIDs.radioYes);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${OtherIssuesContent.descriptionLabel}")`,
        1,
      );
      await page.fill(inputIDs.otherDetails, OtherIssuesContent.otherDetails);
    } else {
      await page.click(inputIDs.radioNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
