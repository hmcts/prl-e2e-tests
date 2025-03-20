import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { TellUsAboutYourSituationContent } from "../../../../../fixtures/citizen/createCase/C100/urgencyAndWithoutNotice/tellUsAboutYourSituationContent";
import { uniqueSelectors } from "./urgentFirstHearingPage";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface TellUsAboutYourSituationPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum radioIds {
  yes = "#hu_hearingWithNext48HrsDetails",
  no = "#hu_hearingWithNext48HrsDetails-2",
}

enum checkBoxIds {
  riskToMySafety = "#hu_reasonOfUrgentHearing",
  riskThatChildren = "#hu_reasonOfUrgentHearing-2",
  legalProceedings = "#hu_reasonOfUrgentHearing-3",
  otherRisks = "#hu_reasonOfUrgentHearing-4",
}

enum inputIds {
  otherRiskDetails = "#hu_otherRiskDetails",
  timeOfHearingDetails = "#hu_timeOfHearingDetails",
  hearingWithNext48HrsMsg = "#hu_hearingWithNext48HrsMsg",
}

const combinedSelectors = [
  ...Object.values(checkBoxIds).map((selector) => ({
    selector,
    action: "click",
  })),
  ...Object.values(inputIds).map((selector) => ({ selector, action: "fill" })),
];

export class TellUsAboutYourSituationPage {
  public static async tellUsAboutYourSituationPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: TellUsAboutYourSituationPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${TellUsAboutYourSituationContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${TellUsAboutYourSituationContent.pageHeading}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        TellUsAboutYourSituationContent,
        "label",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${TellUsAboutYourSituationContent.hint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.legend}:text-is("${TellUsAboutYourSituationContent.question}")`,
        1,
      ),
    ]);
    await page.click(radioIds.yes);
    await page.waitForSelector(
      `${Selectors.GovukLabel}:text-is("${TellUsAboutYourSituationContent.popupText}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHint}:text-is("${TellUsAboutYourSituationContent.popupHint}")`,
      1,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        TellUsAboutYourSituationContent,
        "errorLink",
        `${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        4,
        TellUsAboutYourSituationContent,
        "errorLink",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    for (const { selector, action } of combinedSelectors) {
      if (action === "click") {
        await page.click(selector);
      } else if (action === "fill") {
        await page.fill(
          `${selector}`,
          TellUsAboutYourSituationContent.exampleText,
        );
      }
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
