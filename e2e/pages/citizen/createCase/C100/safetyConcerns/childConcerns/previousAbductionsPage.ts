import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { Helpers } from "../../../../../../common/helpers";
import { Selectors } from "../../../../../../common/selectors";
import { PreviousAbductionsContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/previousAbductionsContent";
import { AxeUtils } from "@hmcts/playwright-common";
import { reportAbuseInputIDs } from "../../../../../../common/commonUniqueSelectors";
enum inputIDs {
  abductionDescription = "#c1A_previousAbductionsShortDesc",
  radioYes = "#c1A_policeOrInvestigatorInvolved",
  radioNo = "#c1A_policeOrInvestigatorInvolved-2",
  otherDetails = "#c1A_policeOrInvestigatorOtherDetails",
}

interface PreviousAbductionsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoPreviousAbductions: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100YesNoPreviousAbductions: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PreviousAbductionsPage {
  public static async previousAbductionsPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100YesNoPreviousAbductions,
  }: PreviousAbductionsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100YesNoPreviousAbductions: c100YesNoPreviousAbductions,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PreviousAbductionsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        PreviousAbductionsContent,
        "hint",
        Selectors.GovukHint,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${PreviousAbductionsContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${PreviousAbductionsContent.bodyM}")`,
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
        `${Selectors.GovukLegendM}:text-is("${PreviousAbductionsContent.legendM}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit({
        exclude: [
          reportAbuseInputIDs.ongoingBehaviorYes,
          reportAbuseInputIDs.seekHelpYes,
          reportAbuseInputIDs.seekHelpNo,
          inputIDs.radioYes,
        ],
      }); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
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
      Helpers.checkGroup(
        page,
        2,
        PreviousAbductionsContent,
        "errorList",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        PreviousAbductionsContent,
        "errorMessage",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
    await this.checkNestedErrorsMessages(page);
  }

  private static async checkNestedErrorsMessages(page: Page): Promise<void> {
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PreviousAbductionsContent.detailsErrorList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${PreviousAbductionsContent.detailsErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100YesNoPreviousAbductions,
  }: FillInFieldsOptions): Promise<void> {
    const textToFill: string[] = ["abductionDescription"];
    if (c100YesNoPreviousAbductions) {
      await page.click(inputIDs.radioYes);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${PreviousAbductionsContent.detailsLabel}")`,
        1,
      );
      textToFill.push("otherDetails");
    } else {
      await page.click(inputIDs.radioNo);
    }
    for (const key of textToFill) {
      const contentKey = key as keyof typeof PreviousAbductionsContent;
      const inputKey = key as keyof typeof inputIDs;
      await page.fill(
        inputIDs[inputKey],
        PreviousAbductionsContent[contentKey],
      );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
