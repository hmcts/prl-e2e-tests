import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ProvideDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/people/provideDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ApplicantGender } from "../../../../../common/types";
import { uniqueSelectors } from "../urgencyAndWithoutNotice/urgentFirstHearingPage";

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
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ProvideDetailsContent,
        "legend",
        `${uniqueSelectors.legend}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ProvideDetailsContent.hint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        7,
        ProvideDetailsContent,
        "label",
        `${Selectors.GovukLabel}`,
      ),
    ]);
    if (gender === "other") {
      await page.click(radioIds.other);
      await page.waitForSelector(
        `${Selectors.GovukHint}:text-is("${ProvideDetailsContent.label8}")`,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(
    page: Page,
    gender: ApplicantGender,
  ): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
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
    await Promise.all([
      page.fill(`${inputIds.day}`, ProvideDetailsContent.exampleDay),
      page.fill(`${inputIds.month}`, ProvideDetailsContent.exampleMonth),
      page.fill(`${inputIds.year}`, ProvideDetailsContent.exampleYear),
    ]);
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
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
