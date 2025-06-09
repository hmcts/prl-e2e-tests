import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../../common/selectors.ts";
import { PassportAmountContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/passportAmountContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { SafetyConcernHelpers } from "../safetyConcernHelpers.ts";

enum inputIDs {
  radioYes = "#c1A_childrenMoreThanOnePassport",
  radioNo = "#c1A_childrenMoreThanOnePassport-2",
  otherDetails = "#c1A_provideOtherDetails",
}

enum checkboxIDs {
  mother = "#c1A_possessionChildrenPassport",
  father = "#c1A_possessionChildrenPassport-2",
  other = "#c1A_possessionChildrenPassport-3",
}

interface PassportAmountPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100MoreThanOnePassport: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100MoreThanOnePassport: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PassportAmountPage {
  public static async passportAmountPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100MoreThanOnePassport,
  }: PassportAmountPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100MoreThanOnePassport: c100MoreThanOnePassport,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${PassportAmountContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${PassportAmountContent.caption}")`,
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLegendM}:text-is("${PassportAmountContent.legendM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLegendS}:text-is("${PassportAmountContent.legendS}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${CommonStaticText.selectAllThatApply}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.father}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.mother}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.other}")`,
        1,
      ),
    ]);
    await SafetyConcernHelpers.checkPassportSidebar(page);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
        PassportAmountContent,
        "errorSummaryList",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        PassportAmountContent,
        "errorMessage",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
    await this.checkOtherDetailsErrors(page);
  }

  private static async checkOtherDetailsErrors(page: Page): Promise<void> {
    await page.check(checkboxIDs.other);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${PassportAmountContent.otherErrorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${PassportAmountContent.otherErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100MoreThanOnePassport,
  }: FillInFieldsOptions): Promise<void> {
    if (c100MoreThanOnePassport) {
      await page.click(inputIDs.radioYes);
    } else {
      await page.click(inputIDs.radioNo);
    }
    for (const checkboxID of Object.values(checkboxIDs)) {
      await page.check(checkboxID);
    }
    await page.fill(inputIDs.otherDetails, PassportAmountContent.otherDetails);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
