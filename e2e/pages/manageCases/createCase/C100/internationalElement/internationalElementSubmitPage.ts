import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { InternationalElementSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/internationalElement/internationalElementSubmitContent";
import { ChildrenAndApplicantsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicantsSubmitContent";

interface InternationalElementSubmitPageOption {
  page: Page;
  accessibilityTest: boolean;
  yesNoInternationalElement: boolean;
}

interface checkFieldsOptions {
  page: Page;
  yesNoInternationalElement: boolean;
}

interface checkFilledDataOptions {
  page: Page;
  yesNoInternationalElement: boolean;
}

export class InternationalElementSubmitPage {
  public static async internationalElementSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoInternationalElement: yesNoInternationalElement,
  }: InternationalElementSubmitPageOption): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoInternationalElement: yesNoInternationalElement,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoInternationalElement: yesNoInternationalElement,
  }: InternationalElementSubmitPageOption): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${InternationalElementSubmitContent.h2}")`,
    );
    await Promise.all([
      this.checkPageFields({
        page: page,
        yesNoInternationalElement: yesNoInternationalElement,
      }),
      this.checkPageData({
        page: page,
        yesNoInternationalElement: yesNoInternationalElement,
      }),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPageFields({
    page: page,
    yesNoInternationalElement: yesNoInternationalElement,
  }: checkFieldsOptions): Promise<void> {
    if (yesNoInternationalElement) {
    } else {
    }
  }

  private static async checkPageData({
    page: page,
    yesNoInternationalElement: yesNoInternationalElement,
  }: checkFilledDataOptions): Promise<void> {
    if (yesNoInternationalElement) {
    } else {
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${InternationalElementSubmitContent.continue}")`,
    );
  }
}
