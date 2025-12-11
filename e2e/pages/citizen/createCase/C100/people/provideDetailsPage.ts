import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import { ProvideDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/people/provideDetailsContent.ts";

interface ProvideDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  gender: ApplicantGender;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  gender: ApplicantGender;
}

interface fillInFieldsOptions {
  page: Page;
  gender: ApplicantGender;
}

enum radioIds {
  female = "#gender",
  male = "#gender-2",
  other = "#gender-3",
}

enum inputIds {
  day = "#dateOfBirth-day",
  month = "#dateOfBirth-month",
  year = "#dateOfBirth-year",
}

enum checkBoxIds {
  isDateOfBirthUnknown = "#isDateOfBirthUnknown",
}

export class ProvideDetailsPage {
  public static async provideDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    gender: gender,
  }: ProvideDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      gender: gender,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page, gender);
    }
    await this.fillInFields({
      page: page,
      gender: gender,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    gender: gender,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ProvideDetailsContent.pageTitle}")`,
    );
    await page.click(checkBoxIds.isDateOfBirthUnknown);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetVisibleLegend}:text-is("${ProvideDetailsContent.legend1}")`,
        1,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetVisibleLegend}:text-is("${ProvideDetailsContent.legend2}")`,
        1,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ProvideDetailsContent.hint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ProvideDetailsContent,
        "label",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ProvideDetailsContent.repeatedLabel1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ProvideDetailsContent.repeatedLabel2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ProvideDetailsContent.repeatedLabel3}")`,
        2,
      ),
    ]);
    await page.click(checkBoxIds.isDateOfBirthUnknown);
    if (gender === "other") {
      await page.click(radioIds.other);
      await page.waitForSelector(
        `${Selectors.GovukLabel}:text-is("${ProvideDetailsContent.label5}")`,
      );
    }
    if (accessibilityTest) {
      // Accessibility Issues PRL-6581 & PRL-6582
    }
  }

  private static async triggerErrorMessages(
    page: Page,
    gender: ApplicantGender,
  ): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${ProvideDetailsContent.errorLink1}")`,
      1,
    );
    if (gender !== "other") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ProvideDetailsContent.errorLink2}")`,
        1,
      );
    }
  }

  private static async fillInFields({
    page: page,
    gender: gender,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(`${inputIds.day}`, ProvideDetailsContent.exampleDay);
    await page.fill(`${inputIds.month}`, ProvideDetailsContent.exampleMonth);
    await page.fill(`${inputIds.year}`, ProvideDetailsContent.exampleYear);
    switch (gender) {
      case "male":
        await page.click(radioIds.male);
        break;
      case "female":
        await page.click(radioIds.female);
        break;
      case "other":
        await page.click(radioIds.other);
        break;
      default:
        throw new Error(`Unexpected value for gender: ${gender}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
