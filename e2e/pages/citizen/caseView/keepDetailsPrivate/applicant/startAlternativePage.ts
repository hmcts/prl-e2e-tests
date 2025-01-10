import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { ApplicantStartAlternativeContent } from "../../../../../fixtures/citizen/caseView/keepDetailsPrivate/applicant/startAlternativeContent.ts";

interface Start_alternativeParams {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
  isApplicant: boolean;
}

enum UniqueSelectors {
  yes = "#startAlternative",
  hiddenYesAddress = "#contactDetailsPrivate",
  hiddenYesPhone = "#contactDetailsPrivate-2",
  hiddenYesEmail = "#contactDetailsPrivate-3",
  no = "#startAlternative-2",
}

export class ApplicantStartAlternativePage {
  public static async applicantStartAlternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: Start_alternativeParams): Promise<void> {
    await this.applicantCheckPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo });
  }

  public static async respondentStartAlternativePage({
    page,
    accessibilityTest,
    startAlternativeYesNo,
  }: Start_alternativeParams): Promise<void> {
    await this.respondentCheckPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, startAlternativeYesNo });
  }

  private static async applicantCheckPageLoads({
    page,
    accessibilityTest,
  }: Partial<Start_alternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ApplicantStartAlternativeContent.applicantPageTitle,
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

  private static async respondentCheckPageLoads({
    page,
    accessibilityTest,
  }: Partial<Start_alternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ApplicantStartAlternativeContent.respondentPageTitle,
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
    isApplicant,
  }: Partial<Start_alternativeParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    if (startAlternativeYesNo) {
      await page.click(UniqueSelectors.yes);
      if (isApplicant) {
        await this.applicantHiddenFormLabels(page);
      } else {
        await this.respondentHiddenFormLabels(page);
      }
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

  private static async applicantHiddenFormLabels(page: Page): Promise<void> {
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
        `${Selectors.div}:text-is("${ApplicantStartAlternativeContent.hiddenDivApplicant}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${ApplicantStartAlternativeContent.hiddenLegend}")`,
        1,
      ),
    ]);
  }

  private static async respondentHiddenFormLabels(page: Page): Promise<void> {
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
        `${Selectors.div}:text-is("${ApplicantStartAlternativeContent.hiddenDivRespondent}")`,
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
