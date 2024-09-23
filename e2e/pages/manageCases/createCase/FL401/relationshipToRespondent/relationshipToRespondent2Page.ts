import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RelationshipToRespondent2Content } from "../../../../../fixtures/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent2Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum otherRelationshipIDs {
  radioFather = "#respondentRelationOptions_applicantRelationshipOptions-father",
  radioMother = "#respondentRelationOptions_applicantRelationshipOptions-mother",
  radioSon = "#respondentRelationOptions_applicantRelationshipOptions-son",
  radioDaughter = "#respondentRelationOptions_applicantRelationshipOptions-daughter",
  radioBrother = "#respondentRelationOptions_applicantRelationshipOptions-brother",
  radioSister = "#respondentRelationOptions_applicantRelationshipOptions-sister",
  radioGrandfather = "#respondentRelationOptions_applicantRelationshipOptions-grandfather",
  radioGrandmother = "#respondentRelationOptions_applicantRelationshipOptions-grandmother",
  radioUncle = "#respondentRelationOptions_applicantRelationshipOptions-uncle",
  radioAunt = "#respondentRelationOptions_applicantRelationshipOptions-aunt",
  radioNephew = "#respondentRelationOptions_applicantRelationshipOptions-nephew",
  radioNiece = "#respondentRelationOptions_applicantRelationshipOptions-niece",
  radioCousin = "#respondentRelationOptions_applicantRelationshipOptions-cousin",
  radioOther = "#respondentRelationOptions_applicantRelationshipOptions-other",
  radioOtherInput = "#respondentRelationOptions_relationOptionsOther",
}

enum relationshipPeriodIDs {
  startDateDay = "#relationshipDateComplexStartDate-day",
  startDateMonth = "#relationshipDateComplexStartDate-month",
  startDateYear = "#relationshipDateComplexStartDate-year",
  endDateDay = "#relationshipDateComplexEndDate-day",
  endDateMonth = "#relationshipDateComplexEndDate-month",
  endDateYear = "#relationshipDateComplexEndDate-year",
  relationshipDateDay = "#applicantRelationshipDate-day",
  relationshipDateMonth = "#applicantRelationshipDate-month",
  relationshipDateYear = "#applicantRelationshipDate-year",
}

enum invalidRelationshipDates {
  startDateDay = "1",
  startDateMonth = "0",
  startDateYear = "12",
  endDateDay = "a",
  endDateMonth = "1",
  endDateYear = "c",
  relationshipDateDay = "1",
  relationshipDateMonth = "",
  relationshipDateYear = "",
}

export type fl401RespondentRelationshipOther =
  | "Father"
  | "Mother"
  | "Son"
  | "Daughter"
  | "Brother"
  | "Sister"
  | "Grandfather"
  | "Grandmother"
  | "Uncle"
  | "Aunt"
  | "Nephew"
  | "Niece"
  | "Cousin"
  | "Other";

interface RelationshipToRespondent2PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  respondentRelationshipOther?: fl401RespondentRelationshipOther;
}

interface OtherRelationshipCheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface OtherRelationshipFillInFieldsOptions {
  page: Page;
  respondentRelationshipOther: fl401RespondentRelationshipOther;
}

interface RelationshipPeriodPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface OtherRelationshipPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  respondentRelationshipOther: fl401RespondentRelationshipOther;
}

interface RelationshipPeriodCheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class RelationshipToRespondent2Page {
  public static async relationshipToRespondent2Page({
    page,
    accessibilityTest,
    errorMessaging,
    respondentRelationshipOther,
  }: RelationshipToRespondent2PageOptions): Promise<void> {
    if (respondentRelationshipOther) {
      await this.otherRelationshipPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        respondentRelationshipOther: respondentRelationshipOther,
      });
    } else {
      await this.relationshipPeriodPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
    }
  }

  private static async otherRelationshipPage({
    page,
    accessibilityTest,
    errorMessaging,
    respondentRelationshipOther,
  }: OtherRelationshipPageOptions): Promise<void> {
    await this.otherRelationshipCheckPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.otherRelationshipCheckErrors(page);
    }
    await this.otherRelationshipFillInFields({
      page: page,
      respondentRelationshipOther: respondentRelationshipOther,
    });
  }

  private static async otherRelationshipCheckPageLoads({
    page,
    accessibilityTest,
  }: OtherRelationshipCheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${RelationshipToRespondent2Content.pageLoadCheckOther}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        14,
        RelationshipToRespondent2Content,
        "isNoneFormLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RelationshipToRespondent2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RelationshipToRespondent2Content.p1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async otherRelationshipCheckErrors(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${RelationshipToRespondent2Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${RelationshipToRespondent2Content.isNoneErrorValidation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${RelationshipToRespondent2Content.isNoneErrorMessage}")`,
        1,
      ),
    ]);
    await page.click(otherRelationshipIDs.radioOther);
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${RelationshipToRespondent2Content.relationshipOtherLabel}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${RelationshipToRespondent2Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${RelationshipToRespondent2Content.relationshipOtherErrorValidation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${RelationshipToRespondent2Content.relationshipOtherErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async otherRelationshipFillInFields({
    page,
    respondentRelationshipOther,
  }: OtherRelationshipFillInFieldsOptions): Promise<void> {
    let radioKey =
      `radio${respondentRelationshipOther}` as keyof typeof otherRelationshipIDs;
    await page.click(otherRelationshipIDs[radioKey]);
    if (respondentRelationshipOther === "Other") {
      await page.waitForSelector(
        `${Selectors.GovukFormLabel}:text-is("${RelationshipToRespondent2Content.relationshipOtherLabel}")`,
      );
      await page.fill(
        otherRelationshipIDs.radioOtherInput,
        RelationshipToRespondent2Content.relationshipOtherInput,
      );
    }
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent2Content.continue}")`,
    );
  }

  private static async relationshipPeriodPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: RelationshipPeriodPageOptions): Promise<void> {
    await this.relationshipPeriodCheckPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.relationshipPeriodCheckErrors(page);
    }
    await this.relationshipPeriodFillInFields(page);
  }

  private static async relationshipPeriodCheckPageLoads({
    page,
    accessibilityTest,
  }: RelationshipPeriodCheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${RelationshipToRespondent2Content.notNoneHeading}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        RelationshipToRespondent2Content,
        "notNoneFormLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RelationshipToRespondent2Content.dayLabel}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RelationshipToRespondent2Content.monthLabel}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${RelationshipToRespondent2Content.yearLabel}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RelationshipToRespondent2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RelationshipToRespondent2Content.p1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async relationshipPeriodCheckErrors(
    page: Page,
  ): Promise<void> {
    for (let [key, inputValue] of Object.entries(invalidRelationshipDates)) {
      let typedKey = key as keyof typeof relationshipPeriodIDs;
      await page.fill(relationshipPeriodIDs[typedKey], inputValue);
    }
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${RelationshipToRespondent2Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        RelationshipToRespondent2Content,
        "relationshipErrorValidation",
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        RelationshipToRespondent2Content,
        "relationshipErrorMessage",
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
  }

  private static async relationshipPeriodFillInFields(
    page: Page,
  ): Promise<void> {
    let dateKeys: string[] = [
      "startDateDay",
      "startDateMonth",
      "startDateYear",
      "endDateDay",
      "endDateMonth",
      "endDateYear",
      "relationshipDateDay",
      "relationshipDateMonth",
      "relationshipDateYear",
    ];
    for (let key of dateKeys) {
      let fieldKey = key as keyof typeof relationshipPeriodIDs;
      let contentKey = key as keyof typeof RelationshipToRespondent2Content;
      await page.fill(
        relationshipPeriodIDs[fieldKey],
        RelationshipToRespondent2Content[contentKey],
      );
    }
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent2Content.continue}")`,
    );
  }
}
