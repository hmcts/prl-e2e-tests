import { Page } from "@playwright/test";
import { WelshPageRequirementType } from "./welshLanguageRequirements1Page.ts";
import { WelshLanguageRequirementsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirementsSubmitContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers.ts";

interface WelshLanguageRequirementsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
}

interface checkFieldsOptions {
  page: Page;
  WelshPageRequirementType: WelshPageRequirementType;
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
      `${Selectors.h2}:text-is("${WelshLanguageRequirementsSubmitContent.h2}")`,
    );
    await Promise.all([
      this.checkPageFields({
        page: page,
        WelshPageRequirementType: WelshPageRequirementType,
      }),
      this.checkPageData({
        page: page,
        WelshPageRequirementType: WelshPageRequirementType,
        yesNoWelshLanguage: yesNoWelshLanguage,
      }),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageFields({
    page: page,
    WelshPageRequirementType: WelshPageRequirementType,
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
          "text16English",
          `${Selectors.GovukText16}`,
        );
        break;
      case "welsh":
        await Helpers.checkGroup(
          page,
          4,
          WelshLanguageRequirementsSubmitContent,
          "text16Welsh",
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
