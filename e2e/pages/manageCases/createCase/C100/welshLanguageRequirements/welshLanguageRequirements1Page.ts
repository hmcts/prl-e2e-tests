import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WelshLanguageRequirements1Content } from "../../../../../fixtures/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirements1Content";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";

interface WelshLanguageRequirements1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillinFieldsOptions {
  page: Page;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
}

export type WelshPageRequirementType = "no" | "english" | "welsh";

enum UniqueSelectors_Yes_No_formLabels {
  formLabelWelshLanguageRequirement_Yes = "label[for='welshLanguageRequirement_Yes']",
  formLabelWelshLanguageRequirement_No = "label[for='welshLanguageRequirement_No']",
  formLabelWelshLanguageRequirementApplicationNeedEnglish_Yes = "label[for='welshLanguageRequirementApplicationNeedEnglish_Yes']",
  formLabelWelshLanguageRequirementApplicationNeedEnglish_No = "label[for='welshLanguageRequirementApplicationNeedEnglish_No']",
  languageRequirementApplicationNeedWelsh_Yes = "label[for='languageRequirementApplicationNeedWelsh_Yes']",
  languageRequirementApplicationNeedWelsh_No = "label[for='languageRequirementApplicationNeedWelsh_No']",
}

enum UniqueSelectors {
  welshLanguageRequirement_Yes = "#welshLanguageRequirement_Yes",
  welshLanguageRequirement_No = "#welshLanguageRequirement_No",
  english = "#welshLanguageRequirementApplication-english",
  welsh = "#welshLanguageRequirementApplication-welsh",
  welshLanguageRequirementApplicationNeedEnglish_Yes = "#welshLanguageRequirementApplicationNeedEnglish_Yes",
  welshLanguageRequirementApplicationNeedEnglish_no = "#welshLanguageRequirementApplicationNeedEnglish_No",
  languageRequirementApplicationNeedWelsh_Yes = "#languageRequirementApplicationNeedWelsh_Yes",
  languageRequirementApplicationNeedWelsh_No = "#languageRequirementApplicationNeedWelsh_No",
}

export class WelshLanguageRequirements1Page {
  public static async welshLanguageRequirements1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: WelshLanguageRequirements1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      WelshPageRequirementType: WelshPageRequirementType,
      yesNoWelshLanguage: yesNoWelshLanguage,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${WelshLanguageRequirements1Content.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${WelshLanguageRequirements1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors_Yes_No_formLabels.formLabelWelshLanguageRequirement_Yes}:text-is("${WelshLanguageRequirements1Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors_Yes_No_formLabels.formLabelWelshLanguageRequirement_No}:text-is("${WelshLanguageRequirements1Content.formLabelNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page: page,
    WelshPageRequirementType: WelshPageRequirementType,
    yesNoWelshLanguage: yesNoWelshLanguage,
  }: fillinFieldsOptions): Promise<void> {
    switch (WelshPageRequirementType) {
      case "no":
        await page.click(`${UniqueSelectors.welshLanguageRequirement_No}`);
        break;
      case "english":
        await page.click(`${UniqueSelectors.welshLanguageRequirement_Yes}`);
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.hiddenFormLabel1}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.formLabelEnglish}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.formLabelWelsh}")`,
            1,
          ),
        ]);
        await page.click(`${UniqueSelectors.english}`);
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.hiddenFormLabel2}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${UniqueSelectors_Yes_No_formLabels.languageRequirementApplicationNeedWelsh_Yes}:text-is("${WelshLanguageRequirements1Content.formLabelYes}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${UniqueSelectors_Yes_No_formLabels.languageRequirementApplicationNeedWelsh_No}:text-is("${WelshLanguageRequirements1Content.formLabelNo}")`,
            1,
          ),
        ]);
        if (yesNoWelshLanguage) {
          await page.click(
            `${UniqueSelectors.languageRequirementApplicationNeedWelsh_Yes}`,
          );
        } else {
          await page.click(
            `${UniqueSelectors.languageRequirementApplicationNeedWelsh_No}`,
          );
        }
        break;
      case "welsh":
        await page.click(`${UniqueSelectors.welshLanguageRequirement_Yes}`);
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.hiddenFormLabel1}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.formLabelEnglish}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.formLabelWelsh}")`,
            1,
          ),
        ]);
        await page.click(`${UniqueSelectors.welsh}`);
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirements1Content.hiddenFormLabel3}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${UniqueSelectors_Yes_No_formLabels.formLabelWelshLanguageRequirementApplicationNeedEnglish_Yes}:text-is("${WelshLanguageRequirements1Content.formLabelYes}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${UniqueSelectors_Yes_No_formLabels.formLabelWelshLanguageRequirementApplicationNeedEnglish_No}:text-is("${WelshLanguageRequirements1Content.formLabelNo}")`,
            1,
          ),
        ]);
        if (yesNoWelshLanguage) {
          await page.click(
            `${UniqueSelectors.welshLanguageRequirementApplicationNeedEnglish_Yes}`,
          );
        } else {
          await page.click(
            `${UniqueSelectors.welshLanguageRequirementApplicationNeedEnglish_no}`,
          );
        }
    }
    await page.click(
      `${Selectors.button}:text-is("${WelshLanguageRequirements1Content.continue}")`,
    );
  }
}
