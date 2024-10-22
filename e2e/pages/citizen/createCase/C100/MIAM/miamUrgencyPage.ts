import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AxeTest from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { MiamUrgencyContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamUrgencyContent";

export interface MiamUrgencyPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamUrgencyType: MiamUrgencyType;
}

export type MiamUrgencyType =
  | "Risk to life"
  | "Risk to family life"
  | "Risk to safety of home"
  | "Delay causing risk of harm"
  | "Delay causing risk of removal"
  | "Delay causing risk of unfair court decision"
  | "Delay causing risk of financial hardship"
  | "Delay causing risk of irretrievable problems"
  | "Delay dispute starting in another country"
  | "None of these";

enum uniqueSelectors {
  riskToLife = "#miam_urgency",
  riskToFamilyLife = "#miam_urgency-2",
  riskToSafetyOfHome = "#miam_urgency-3",
  delayCausingRiskOfHarm = "#miam_urgency-4",
  delayCausingRiskOfRemoval = "#miam_urgency-5",
  delayCausingRiskOfUnfairCourtDecision = "#miam_urgency-6",
  delayCausingRiskOfFinancialHardship = "#miam_urgency-7",
  delayCausingRiskOfIrretrievableProblems = "#miam_urgency-8",
  delayDisputeStartingInAnotherCountry = "#miam_urgency-9",
  noneOfThese = "#miam_urgency-11",
}

export class MiamUrgencyPage {
  public static async miamUrgencyPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamUrgencyType: miamUrgencyType,
  }: MiamUrgencyPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({ page: page, miamUrgencyType: miamUrgencyType });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamUrgencyPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamUrgencyContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        MiamUrgencyContent,
        `govukBody`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${MiamUrgencyContent.govukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        10,
        MiamUrgencyContent,
        `govukLabel`,
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamUrgencyPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MiamUrgencyContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${MiamUrgencyContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamUrgencyType: miamUrgencyType,
  }: Partial<MiamUrgencyPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    switch (miamUrgencyType) {
      case "Risk to life":
        await page.click(uniqueSelectors.riskToLife);
        break;
      case "Risk to family life":
        await page.click(uniqueSelectors.riskToFamilyLife);
        break;
      case "Risk to safety of home":
        await page.click(uniqueSelectors.riskToSafetyOfHome);
        break;
      case "Delay causing risk of harm":
        await page.click(uniqueSelectors.delayCausingRiskOfHarm);
        break;
      case "Delay causing risk of removal":
        await page.click(uniqueSelectors.delayCausingRiskOfRemoval);
        break;
      case "Delay causing risk of unfair court decision":
        await page.click(uniqueSelectors.delayCausingRiskOfUnfairCourtDecision);
        break;
      case "Delay causing risk of financial hardship":
        await page.click(uniqueSelectors.delayCausingRiskOfFinancialHardship);
        break;
      case "Delay causing risk of irretrievable problems":
        await page.click(
          uniqueSelectors.delayCausingRiskOfIrretrievableProblems,
        );
        break;
      case "Delay dispute starting in another country":
        await page.click(uniqueSelectors.delayDisputeStartingInAnotherCountry);
        break;
      default:
        await page.click(uniqueSelectors.noneOfThese);
        break;
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
