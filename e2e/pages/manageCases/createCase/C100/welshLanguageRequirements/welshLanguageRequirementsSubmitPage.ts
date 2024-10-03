import { Page } from "@playwright/test";
import { WelshPageRequirementType } from "./welshLanguageRequirements1Page";
import { WelshLanguageRequirementsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirementsSubmitContent";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";

interface WelshLanguageRequirementsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
}

interface checkFieldsOptions {
  page: Page;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
}

interface checkFilledDataOptions {
  page: Page;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
}

export class WelshLanguageRequirementsSubmitPage {
  public static async welshLanguageRequirementsSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: WelshLanguageRequirementsSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      WelshPageRequirementType: WelshPageRequirementType,
      yesNoWelshLanguage: yesNoWelshLanguage,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: WelshLanguageRequirementsSubmitPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${WelshLanguageRequirementsSubmitContent.h2}")"`,
    );
    await Promise.all([
      this.checkPageFields({
        page: page,
        WelshPageRequirementType: WelshPageRequirementType,
        yesNoWelshLanguage: yesNoWelshLanguage,
      }),
      this.checkPageData({
        page: page,
        WelshPageRequirementType: WelshPageRequirementType,
        yesNoWelshLanguage: yesNoWelshLanguage,
      }),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkPageFields({
    page: page,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: checkFieldsOptions): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHeadingL}:text-is("${WelshLanguageRequirementsSubmitContent.pageTitle}")`,
      1,
    );
    switch (WelshPageRequirementType) {
      case "no":
        await Helpers.checkGroup(
          page,
          2,
          WelshLanguageRequirementsSubmitContent,
          "text16",
          `${Selectors.GovukText16}`,
        );
        break;
      case "english":
        await Helpers.checkGroup(
          page,
          4,
          WelshLanguageRequirementsSubmitContent,
          "text16",
          `${Selectors.GovukText16}`,
        );
        break;
      case "welsh":
        await Helpers.checkGroup(
          page,
          4,
          WelshLanguageRequirementsSubmitContent,
          "text16",
          `${Selectors.GovukText16}`,
        );
        break;
    }
  }

  private static async checkPageData({
    page: page,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: checkFilledDataOptions): Promise<void> {
    switch (WelshPageRequirementType) {
      case "no":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16No}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Change}")`,
            1,
          ),
        ]);
        break;
      case "english":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16English}")`,
          1,
        );
        if (yesNoWelshLanguage) {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Yes}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Change}")`,
              3,
            ),
          ]);
        } else {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Yes}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16No}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Change}")`,
              3,
            ),
          ]);
        }
        break;

      case "welsh":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Welsh}")`,
          1,
        );
        if (yesNoWelshLanguage) {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Yes}")`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Change}")`,
              3,
            ),
          ]);
        } else {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Yes}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16No}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukText16}:text-is("${WelshLanguageRequirementsSubmitContent.text16Change}")`,
              3,
            ),
          ]);
        }
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${WelshLanguageRequirementsSubmitContent.continue}")`,
    );
  }
}