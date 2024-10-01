import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { InternationalElementSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/internationalElement/internationalElementSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { InternationalElement1Content } from "../../../../../fixtures/manageCases/createCase/C100/internationalElement/internationalElement1Content";

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
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${InternationalElementSubmitContent.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${InternationalElementSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        InternationalElementSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (yesNoInternationalElement) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${InternationalElementSubmitContent.text16GiveReasons}")`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${InternationalElementSubmitContent.text16Change}")`,
          6,
        ),
      ]);
    } else {
      await
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${InternationalElementSubmitContent.text16Change}")`,
          3,
        );
    }
  }

  private static async checkPageData({
    page: page,
    yesNoInternationalElement: yesNoInternationalElement,
  }: checkFilledDataOptions): Promise<void> {
    if (yesNoInternationalElement) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${InternationalElement1Content.formLabelYes}")`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${InternationalElement1Content.loremIpsum}")`,
          3,
        ),
      ])
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${InternationalElement1Content.formLabelNo}")`,
        3,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${InternationalElementSubmitContent.continue}")`,
    );
  }
}
