import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { ConcernsForSafetyContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/concernsForSafetyContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum inputIDs {
  yes = "#c1A_haveSafetyConcerns",
  no = "#c1A_haveSafetyConcerns-2",
}

interface ConcernsForSafetyPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildrenSafetyConcerns: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100ChildrenSafetyConcerns: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ConcernsForSafetyPage {
  public static async concernsForSafetyPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100ChildrenSafetyConcerns,
  }: ConcernsForSafetyPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100ChildrenSafetyConcerns,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ConcernsForSafetyContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ConcernsForSafetyContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ConcernsForSafetyContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ConcernsForSafetyContent.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ConcernsForSafetyContent.link}")`,
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
      Helpers.checkGroup(
        page,
        2,
        ConcernsForSafetyContent,
        "p",
        `${Selectors.p}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${ConcernsForSafetyContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ConcernsForSafetyContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100ChildrenSafetyConcerns,
  }: FillInFieldsOptions): Promise<void> {
    if (c100ChildrenSafetyConcerns) {
      await page.click(inputIDs.yes);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ConcernsForSafetyContent,
          "yesLabel",
          `${Selectors.GovukLabel}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLink}:text-is("${ConcernsForSafetyContent.yesLink}")`,
          1,
        ),
      ]);
    } else {
      await page.click(inputIDs.no);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}