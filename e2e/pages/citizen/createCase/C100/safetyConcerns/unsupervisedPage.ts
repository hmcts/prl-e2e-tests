import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { UnsupervisedContent } from "../../../../../fixtures/citizen/createCase/C100/safetyConcerns/unsupervisedContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum inputIDs {
  yesSpendTime = "#c1A_supervisionAgreementDetails",
  yesButSupervised = "#c1A_supervisionAgreementDetails-2",
  noSpendTime = "#c1A_supervisionAgreementDetails-3",
  yesInTouch = "#c1A_agreementOtherWaysDetails",
  noInTouch = "#c1A_agreementOtherWaysDetails-2",
}

export type c100ChildrenSupervisionRadios =
  | "yesSpendTime"
  | "yesButSupervised"
  | "noSpendTime";

interface UnsupervisedPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildrenSupervision: c100ChildrenSupervisionRadios;
  c100ChildrenInTouch: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100ChildrenSupervision: c100ChildrenSupervisionRadios;
  c100ChildrenInTouch: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class UnsupervisedPage {
  public static async unsupervisedPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100ChildrenSupervision,
    c100ChildrenInTouch,
  }: UnsupervisedPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100ChildrenInTouch: c100ChildrenInTouch,
      c100ChildrenSupervision: c100ChildrenSupervision,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${UnsupervisedContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${UnsupervisedContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${UnsupervisedContent.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${UnsupervisedContent.h2Label}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        UnsupervisedContent,
        "legendM",
        Selectors.GovukFieldsetLegend,
      ),
      Helpers.checkGroup(
        page,
        2,
        UnsupervisedContent,
        "formLabel",
        Selectors.GovukLabel,
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
      Helpers.checkGroup(
        page,
        2,
        UnsupervisedContent,
        "errorSummaryList",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        UnsupervisedContent,
        "errorMessage",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100ChildrenSupervision,
    c100ChildrenInTouch,
  }: FillInFieldsOptions): Promise<void> {
    if (
      !["yesSpendTime", "yesButSupervised", "noSpendTime"].includes(
        c100ChildrenSupervision,
      )
    ) {
      throw new Error(
        `Invalid option for c100ChildrenSupervision: ${c100ChildrenSupervision}`,
      );
    }
    const inputKey = c100ChildrenSupervision as keyof typeof inputIDs;
    await page.click(inputIDs[inputKey]);
    if (c100ChildrenInTouch) {
      await page.click(inputIDs.yesInTouch);
    } else {
      await page.click(inputIDs.noInTouch);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
