import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  RelationshipToRespondent2Content
} from "../../../../../fixtures/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent2Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

type respondentRelationshipOther =
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

enum otherRelationshipIDs {
  radioFather = '#respondentRelationOptions_applicantRelationshipOptions-father',
  radioMother = '#respondentRelationOptions_applicantRelationshipOptions-mother',
  radioSon = '#respondentRelationOptions_applicantRelationshipOptions-son',
  radioDaughter = '#respondentRelationOptions_applicantRelationshipOptions-daughter',
  radioBrother = '#respondentRelationOptions_applicantRelationshipOptions-brother',
  radioSister = '#respondentRelationOptions_applicantRelationshipOptions-sister',
  radioGrandfather = '#respondentRelationOptions_applicantRelationshipOptions-grandfather',
  radioGrandmother = '#respondentRelationOptions_applicantRelationshipOptions-grandmother',
  radioUncle = '#respondentRelationOptions_applicantRelationshipOptions-uncle',
  radioAunt = '#respondentRelationOptions_applicantRelationshipOptions-aunt',
  radioNephew = '#respondentRelationOptions_applicantRelationshipOptions-nephew',
  radioNiece = '#respondentRelationOptions_applicantRelationshipOptions-niece',
  radioCousin = '#respondentRelationOptions_applicantRelationshipOptions-cousin',
  radioOther = '#respondentRelationOptions_applicantRelationshipOptions-other'
}

enum relationshipPeriodIDs {
  startDateDay = '#relationshipDateComplexStartDate-day',
  startDateMonth = '#relationshipDateComplexStartDate-month',
  startDateYear = '#relationshipDateComplexStartDate-year',
  endDateDay = '#relationshipDateComplexEndDate-day',
  endDateMonth = '#relationshipDateComplexEndDate-month',
  endDateYear = '#relationshipDateComplexEndDate-year',
  relationshipDateDay = '#applicantRelationshipDate-day',
  relationshipDateMonth = '#applicantRelationshipDate-month',
  relationshipDateYear = '#applicantRelationshipDate-year'
}

interface relationshipToRespondent2PageOptions {
  page: Page,
  accessibilityTest: boolean,
  errorMessaging: boolean,
  respondentRelationshipOther?: respondentRelationshipOther,
}

export class RelationshipToRespondent2Page {
  public static async relationshipToRespondent2Page({
    page,
    accessibilityTest,
    errorMessaging,
    respondentRelationshipOther,
  }: relationshipToRespondent2PageOptions): Promise<void> {
    if (respondentRelationshipOther) {
      await this.otherRelationshipPage(
        page,
        accessibilityTest,
        errorMessaging,
        respondentRelationshipOther
      )
    } else {
      await this.relationshipPeriodPage(
        page,
        accessibilityTest,
        errorMessaging
      )
    }
  }

  private static async otherRelationshipPage(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    respondentRelationshipOther: respondentRelationshipOther
  ): Promise<void> {
    await this.otherRelationshipCheckPageLoads(
      page,
      accessibilityTest
    );
    if (errorMessaging) {
      await this.otherRelationshipCheckErrors(page);
    }
    await this.otherRelationshipFillInFields(page, respondentRelationshipOther);
  }

  private static async otherRelationshipCheckPageLoads(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${RelationshipToRespondent2Content.pageLoadCheckOther}")`
    );
    await Promise.all(
      [
        Helpers.checkGroup(
          page,
          14,
          RelationshipToRespondent2Content,
          'isNoneFormLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${RelationshipToRespondent2Content.pageTitle}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${RelationshipToRespondent2Content.p1}")`,
          1
        )
      ]
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async otherRelationshipCheckErrors(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent2Content.continue}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${RelationshipToRespondent2Content.isNoneErrorSummaryTitle}")`,
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
      ]
    )
  }

  private static async otherRelationshipFillInFields(
    page: Page,
    respondentRelationshipOther: respondentRelationshipOther
  ): Promise<void> {
    let radioKey = `radio${respondentRelationshipOther}` as keyof typeof otherRelationshipIDs;
    await page.click(
      otherRelationshipIDs[radioKey]
    );
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent2Content.continue}")`
    );
  }

  private static async relationshipPeriodPage(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean
  ): Promise<void> {
    await this.relationshipPeriodCheckPageLoads(page, accessibilityTest);
    if (errorMessaging) {

    }

  }

  private static async relationshipPeriodCheckPageLoads(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${RelationshipToRespondent2Content.notNoneHeading}")`
    );
    await Promise.all(
      [
        Helpers.checkGroup(
          page,
          3,
          RelationshipToRespondent2Content,
          'notNoneFormLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkGroup(
          page,
          3,
          RelationshipToRespondent2Content,
          'dayLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkGroup(
          page,
          3,
          RelationshipToRespondent2Content,
          'monthLabel',
          `${Selectors.GovukFormLabel}`
        ),

        Helpers.checkGroup(
          page,
          3,
          RelationshipToRespondent2Content,
          'yearLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${RelationshipToRespondent2Content.pageTitle}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${RelationshipToRespondent2Content.p1}")`,
          1
        )
      ]
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}