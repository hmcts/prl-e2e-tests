import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamChildProtectionContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamChildProtectionContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

export interface MiamChildProtectionPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType;
}

export type MiamChildProtectionConcernsType =
  | "Child protection plan"
  | "Section 47"
  | "None of the above";

enum uniqueSelectors {
  childProtectionPlan = "#miam_childProtectionEvidence",
  section47 = "#miam_childProtectionEvidence-2",
  noneOfAbove = "#miam_childProtectionEvidence-4",
}

export class MiamChildProtectionPage {
  public static async miamChildProtectionPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamChildProtectionConcernsType: miamChildProtectionConcernsType,
  }: MiamChildProtectionPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamChildProtectionConcernsType: miamChildProtectionConcernsType,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamChildProtectionPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamChildProtectionContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamChildProtectionContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${MiamChildProtectionContent.govukHeadingM}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        MiamChildProtectionContent,
        `govukLabel`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${MiamChildProtectionContent.govukHint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamChildProtectionPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${MiamChildProtectionContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MiamChildProtectionContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamChildProtectionConcernsType: miamChildProtectionConcernsType,
  }: Partial<MiamChildProtectionPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    switch (miamChildProtectionConcernsType) {
      case "Child protection plan":
        await page.click(uniqueSelectors.childProtectionPlan);
        break;
      case "Section 47":
        await page.click(uniqueSelectors.section47);
        break;
      default:
        await page.click(uniqueSelectors.noneOfAbove);
        break;
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
