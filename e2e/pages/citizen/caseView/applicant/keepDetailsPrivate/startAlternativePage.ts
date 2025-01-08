import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Page } from "@playwright/test";
import { Start_alternativeContent } from "../../../../../fixtures/citizen/caseView/applicant/keepDetailsPrivate/start_alternativeContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

interface StartAlternativeParams {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
}

enum UniqueSelectors {
  yes = "#startAlternative",
  hiddenYesAddress = "#contactDetailsPrivate",
  hiddenYesPhone = "#contactDetailsPrivate-2",
  hiddenYesEmail = "#contactDetailsPrivate-3",
  no = "#startAlternative-2",
}

export class StartAlternativePage {
  public static async start_alternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: StartAlternativeParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<StartAlternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: Start_alternativeContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${Start_alternativeContent.span}")`,
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
      // await AccessibilityTestHelper.run(page); #TODO: Awaiting for accessibility ticket FPET-1242 to be resolved
    }
  }

  private static async fillInFields({
    page,
    startAlternativeYesNo,
  }: Partial<StartAlternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    if (startAlternativeYesNo) {
      await page.click(UniqueSelectors.yes);
      await this.hiddenFormLabels(page);
      await page.click(UniqueSelectors.hiddenYesAddress);
      await page.click(UniqueSelectors.hiddenYesPhone);
      await page.click(UniqueSelectors.hiddenYesEmail);
    } else {
      await page.check(UniqueSelectors.no);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        Start_alternativeContent,
        "hiddenFormLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${Start_alternativeContent.hiddenDiv}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${Start_alternativeContent.hiddenLegend}")`,
        1,
      ),
    ]);
  }
}
