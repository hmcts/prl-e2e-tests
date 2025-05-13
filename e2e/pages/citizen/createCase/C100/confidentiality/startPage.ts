import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { yesNoDontKnow } from "../../../../../common/types";
import { StartContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/startContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

enum inputIDs {
  yes = "#startAlternative",
  no = "#startAlternative-2",
}

enum checkboxIDs {
  address = "#contactDetailsPrivateAlternative",
  telephone = "#contactDetailsPrivateAlternative-2",
  email = "#contactDetailsPrivateAlternative-3",
}

interface StartPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PrivateDetails: boolean;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100PrivateDetails: boolean;
}

export class StartPage {
  public static async startPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100PrivateDetails,
    c100OthersKnowApplicantsContact,
  }: StartPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page, c100OthersKnowApplicantsContact);
    }
    await this.fillInFields({
      page: page,
      c100PrivateDetails: c100PrivateDetails,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${StartContent.pageTitle_alt}"), ${Selectors.GovukHeadingXL}:text-is("${StartContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        StartContent,
        "bodyM",
        `${Selectors.GovukBodyM}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:has-text("${StartContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page, [
        inputIDs.yes,
      ]); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async checkErrorMessaging(
    page: Page,
    c100OthersKnowApplicantsContact: yesNoDontKnow,
  ): Promise<void> {
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
        `${Selectors.GovukErrorList} ${Selectors.a}:has-text("${StartContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:has-text("${StartContent.errorMessage}")`,
        1,
      ),
    ]);
    await this.checkboxErrorMessages(page, c100OthersKnowApplicantsContact);
  }

  private static async checkboxErrorMessages(
    page: Page,
    c100OthersKnowApplicantsContact: yesNoDontKnow,
  ): Promise<void> {
    if (c100OthersKnowApplicantsContact === "yes") {
      await page.click(inputIDs.yes);
    } else if (
      c100OthersKnowApplicantsContact === "no" ||
      c100OthersKnowApplicantsContact === "dontKnow"
    ) {
      await page.click(inputIDs.yes);
    } else {
      throw new Error(
        `Unrecognised argument for c100OthersKnowApplicantsContact: ${c100OthersKnowApplicantsContact}`,
      );
    }
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
        `${Selectors.GovukErrorList} ${Selectors.a}:has-text("${StartContent.checkboxErrorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:has-text("${StartContent.checkboxErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100PrivateDetails,
  }: FillInFieldsOptions): Promise<void> {
    if (c100PrivateDetails) {
      await page.click(inputIDs.yes);
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHint}:text-is("${StartContent.formHint}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          3,
          StartContent,
          "formLabel",
          `${Selectors.GovukLabel}`,
        ),
      ]);
      for (const checkboxID of Object.values(checkboxIDs)) {
        await page.check(checkboxID);
      }
    } else {
      await page.click(inputIDs.no);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
