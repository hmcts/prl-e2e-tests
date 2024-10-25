import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { StartContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/startContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { yesNoDontKnow } from "../../../../../common/types";

enum inputIDs {
  yes = "#start",
  no = "#start-2",
}

enum checkboxIDs {
  address = "#contactDetailsPrivate",
  telephone = "#contactDetailsPrivate-2",
  email = "#contactDetailsPrivate-3",
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
  c100OthersKnowApplicantsContact: yesNoDontKnow;
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
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100PrivateDetails: c100PrivateDetails,
      c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${StartContent.pageTitle}")`,
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
        `${Selectors.ErrorSummaryList} ${Selectors.a}:text-is("${StartContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${StartContent.errorMessage}")`,
        1,
      ),
    ]);
    await this.checkboxErrorMessages(page);
  }

  private static async checkboxErrorMessages(page: Page): Promise<void> {
    await page.click(inputIDs.yes);
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${StartContent.checkboxErrorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${StartContent.checkboxErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100PrivateDetails,
    c100OthersKnowApplicantsContact,
  }: FillInFieldsOptions): Promise<void> {
    if (c100PrivateDetails) {
      let formHintContentKey: keyof typeof StartContent;
      if (c100OthersKnowApplicantsContact === "yes") {
        formHintContentKey = "formHint";
      } else if (
        c100OthersKnowApplicantsContact === "no" ||
        c100OthersKnowApplicantsContact === "dontKnow"
      ) {
        formHintContentKey = "alternativeFormHint";
      } else {
        throw new Error(
          `Unrecognised argument for c100OthersKnowApplicantsContact: ${c100OthersKnowApplicantsContact}`,
        );
      }
      await page.click(inputIDs.yes);
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormHint}:text-is("${StartContent[formHintContentKey]}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          3,
          StartContent,
          "formLabel",
          `${Selectors.GovukFormLabel}`,
        ),
      ]);
      for (let checkboxID of Object.values(checkboxIDs)) {
        await page.check(checkboxID);
      }
    } else {
      await page.click(inputIDs.no);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
