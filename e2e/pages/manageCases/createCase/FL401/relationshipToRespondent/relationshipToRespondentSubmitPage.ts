import { Page } from "@playwright/test";
import {
  respondentRelationship, respondentRelationshipOther
} from "../../../../../journeys/manageCases/createCase/FL401RelationshipToRespondent/FL401RelationshipToRespondent";
import { Selectors } from "../../../../../common/selectors";
import {
  RelationshipToRespondentSubmitContent
} from "../../../../../fixtures/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondentSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface relationshipToRespondentSubmitPageOptions {
  page: Page,
  accessibilityTest: boolean,
  respondentRelationship: respondentRelationship,
  respondentRelationshipOther?: respondentRelationshipOther
}

interface checkPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean,
  respondentRelationship: respondentRelationship,
  respondentRelationshipOther?: respondentRelationshipOther
}

interface checkStaticTextOptions {
  page: Page,
  respondentRelationship: respondentRelationship,
}


interface checkFilledDataOptions {
  page: Page,
  respondentRelationship: respondentRelationship,
  respondentRelationshipOther?: respondentRelationshipOther
}

export class RelationshipToRespondentSubmitPage {
  public static async relationshipToRespondentSubmitPage({
     page,
     accessibilityTest,
     respondentRelationship,
     respondentRelationshipOther
  }: relationshipToRespondentSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      respondentRelationship,
      respondentRelationshipOther
    })
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    respondentRelationship,
    respondentRelationshipOther
  }: checkPageLoadsOptions): Promise<void> {
    await this.checkStaticText({
      page,
      respondentRelationship,
    })
    await this.checkFilledData({
      page,
      respondentRelationship,
      respondentRelationshipOther
    });
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkStaticText({
    page,
    respondentRelationship,
  }: checkStaticTextOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${RelationshipToRespondentSubmitContent.h2}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${RelationshipToRespondentSubmitContent.text16Change}")`,
          2
        ),
        Helpers.checkGroup(
          page,
          2,
          RelationshipToRespondentSubmitContent,
          'defaultText16',
          `${Selectors.GovukText16}`
        ),
      ]
    );
    if (respondentRelationship === 'None of the above') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${RelationshipToRespondentSubmitContent.isNoneText16Static}")`,
        1
      );
    } else {
      await Helpers.checkGroup(
        page,
        4,
        RelationshipToRespondentSubmitContent,
        'relationshipPeriodText16',
        `${Selectors.GovukText16}`
      );
    }
  }
  
  private static async checkFilledData({
   page,
   respondentRelationship,
   respondentRelationshipOther
  }: checkFilledDataOptions): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${respondentRelationship}")`,
      1
    );
    if (respondentRelationship === 'None of the above') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${respondentRelationshipOther}")`,
        1
      );
    } else {
      await Helpers.checkGroup(
        page,
        3,
        RelationshipToRespondentSubmitContent,
        'relationshipPeriodText16',
        `${Selectors.GovukText16}`
      )
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondentSubmitContent.continue}")`
    )
  }
}