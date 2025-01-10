import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  ApplicantStartAlternativeContent
} from "../../../../fixtures/citizen/caseView/keepDetailsPrivate/startAlternativeContent.ts";

interface Start_alternativeParams {
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

export class ApplicantStartAlternativePage {
  public static async startAlternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: Start_alternativeParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<Start_alternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ApplicantStartAlternativeContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ApplicantStartAlternativeContent.span}")`,
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
  }: Partial<Start_alternativeParams>): Promise<void> {
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
        ApplicantStartAlternativeContent,
        "hiddenFormLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${ApplicantStartAlternativeContent.hiddenDiv}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${ApplicantStartAlternativeContent.hiddenLegend}")`,
        1,
      ),
    ]);
  }
}
